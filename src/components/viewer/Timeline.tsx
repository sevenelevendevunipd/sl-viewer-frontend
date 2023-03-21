import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import { CustomSeriesOption, CustomSeriesRenderItem, CustomSeriesRenderItemParams } from 'echarts';
import { LogParserResponse_4dfe1dd_LogEntry } from '../../openapi';
import { ThemeContext } from '../ThemeSwitcher';
import { useMemo, useContext } from 'react';

type ECOption = echarts.ComposeOption<CustomSeriesOption>;
type LogEntry = LogParserResponse_4dfe1dd_LogEntry
declare interface TimelineProps {
    logEntries: LogEntry[],
}

declare interface Rect {
    x: number,
    y: number,
    width: number,
    height: number,
}

type TimelineEntry = [number, number, number, number, number, string];

const HEIGHT_RATIO = 0.6;

const DIM_START = 0, DIM_END = 1, DIM_CODE_INDEX = 2, DIM_UNIT = 3, DIM_SUBUNIT = 4, DIM_DESCRIPTION = 5;

function makeOption(events: TimelineEntry[], codes: string[], theme: string): ECOption {
    return {
        tooltip: {},
        animation: false,
        dataZoom: [
            {
                type: 'slider',
                xAxisIndex: 0,
                filterMode: 'weakFilter',
                height: 20,
                bottom: 0,
                start: 0,
                end: 100,
                handleIcon:
                    'path://M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                handleSize: '80%',
                showDetail: false
            },
            {
                type: 'inside',
                id: 'insideX',
                xAxisIndex: 0,
                filterMode: 'weakFilter',
                start: 0,
                end: 100,
                zoomOnMouseWheel: false,
                moveOnMouseMove: true
            },
            {
                type: 'slider',
                yAxisIndex: 0,
                zoomLock: true,
                width: 10,
                right: 10,
                top: 70,
                bottom: 20,
                start: 0,
                end: 100,
                handleSize: 0,
                showDetail: false
            },
            {
                type: 'inside',
                id: 'insideY',
                yAxisIndex: 0,
                start: 0,
                end: 100,
                zoomOnMouseWheel: false,
                moveOnMouseMove: true,
                moveOnMouseWheel: true
            }
        ],
        grid: {
            show: true,
            top: 70,
            bottom: 20,
            left: 100,
            right: 20,
            //backgroundColor: '#fff',
            borderWidth: 0
        },
        xAxis: {
            type: 'time',
            position: 'top',
            splitLine: {
                lineStyle: {
                    color: ['#E9EDFF']
                }
            },
            axisLine: {
                show: false
            },
            axisTick: {
                lineStyle: {
                    color: '#929ABA'
                }
            },
            axisLabel: {
                color: '#929ABA',
                inside: false,
                align: 'center'
            }
        },
        yAxis: {
            axisTick: { show: false },
            splitLine: { show: false },
            axisLine: { show: false },
            axisLabel: { show: false },
            min: 0,
            max: codes.length,
        },
        series: [
            {
                type: 'custom',
                renderItem: renderGanttItem,
                dimensions: [
                    { name: "start", type: "time" },
                    { name: "end", type: "time" },
                    { name: "codeIndex", type: "number" },
                    { name: "unit" },
                    { name: "subunit" },
                    { name: "description" },
                ],
                encode: {
                    x: [DIM_START, DIM_END],
                    y: DIM_CODE_INDEX,
                    tooltip: [DIM_START, DIM_END, DIM_UNIT, DIM_SUBUNIT],
                    itemName: DIM_DESCRIPTION,
                },
                data: events,
                colorBy: "data",
                itemStyle: {
                    borderColor: theme === "dark" ? "#000" : "#fff", //used as text color lol
                }
            },
            {
                type: 'custom',
                renderItem: renderAxisLabelItem,
                encode: {
                    x: -1,
                    y: 0
                },
                dimensions: ["", "Code"],
                data: codes.map((v, i) => [i, v]),
                tooltip: {
                    show: false,
                },
            }
        ]
    };
}
const renderGanttItem: CustomSeriesRenderItem = function (params, api) {
    const codeIndex = api.value(DIM_CODE_INDEX);
    const entryStart = api.coord([api.value(DIM_START), codeIndex]);
    const entryEnd = api.coord([api.value(DIM_END), codeIndex]);
    const barLength = entryEnd[0] - entryStart[0];
    // Get the heigth corresponds to length 1 on y axis.
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const barHeight = (api.size!([0, 1]) as number[])[1] * HEIGHT_RATIO;
    const x = entryStart[0];
    const y = entryStart[1] - barHeight;
    const description = api.value(DIM_DESCRIPTION) as string;
    const descriptionWidth = echarts.format.getTextRect(description).width;
    const text =
        barLength > descriptionWidth + 40 && x + barLength >= 180
            ? description
            : '';
    const rectNormal = clipRectByRect(params, {
        x: x,
        y: y,
        width: barLength,
        height: barHeight
    });
    const rectText = clipRectByRect(params, {
        x: x,
        y: y,
        width: barLength,
        height: barHeight
    });
    return {
        type: 'group',
        children: [
            {
                type: 'rect',
                ignore: !rectNormal,
                shape: rectNormal,
                style: {
                    fill: api.visual("color")
                }
            },
            {
                type: 'rect',
                ignore: !rectText,
                shape: rectText,

                style: {
                    fill: 'transparent',
                    text: text,
                    textFill: api.visual('borderColor')
                }
            }
        ]
    };
}
const renderAxisLabelItem: CustomSeriesRenderItem = function (params, api) {
    const y = api.coord([0, api.value(0)])[1];
    if (y < (params.coordSys as unknown as Rect).y + 5) {
        return;
    }
    return {
        type: 'text',
        style: {
            x: 70,
            y: y - 5,
            textVerticalAlign: 'bottom',
            textAlign: 'center',
            text: api.value(1) as string,
            textFill: api.visual('color')
        }
    };
}
function clipRectByRect(params: CustomSeriesRenderItemParams, rect: Rect) {
    const p = params.coordSys as unknown as Rect;
    return echarts.graphic.clipRectByRect(rect, p);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function transformEvents(events: LogEntry[]): [TimelineEntry[], string[]] {
    return [[
        [1676661255000, 1676661655000, 0, 1, 1, "In Service Mode"],
        [1676661355000, 1676661755000, 1, 1, 2, "In Service Mode"],
        [1676661455000, 1676661855000, 2, 1, 1, "Reset History Log"],
        [1676661555000, 1676661955000, 3, 1, 2, "Reset History Log"],
        [1676662055000, 1676662455000, 3, 1, 2, "Reset History Log"],
        [1676662155000, 1676662555000, 2, 1, 1, "Reset History Log"],
        [1676662255000, 1676662655000, 1, 1, 2, "In Service Mode"],
        [1676662355000, 1676662755000, 0, 1, 1, "In Service Mode"],
        [1676661655000, 1676662355000, 4, 1, 1, "lolololololololol"],
    ], [
        "1,1 S009",
        "1,2 S009",
        "1,1 CCX04",
        "1,2 CCX04",
        "1,3 niiice"
    ]];
}

export function Timeline(props: TimelineProps): JSX.Element {
    const [timelineEntries, codes] = useMemo(() => {
        return transformEvents(props.logEntries)
    }, [props.logEntries]);
    const themeContext = useContext(ThemeContext);
    if (themeContext === undefined) {
        throw new Error("Timeline is required to be inside a ThemeProvider");
    }
    const [theme] = themeContext;
    return <ReactECharts theme={theme} option={makeOption(timelineEntries, codes, theme)} style={{ height: '400px', width: '100%' }} />;
}