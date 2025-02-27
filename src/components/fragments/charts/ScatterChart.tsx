import { Margin } from "recharts/types/util/types";
import { CategoricalChartFunc } from "recharts/types/chart/generateCategoricalChart";
import { useDarkMode } from "../../../hooks/useDarkMode";
import { ScatterChart as Inner, CartesianGrid, XAxis, YAxis, ZAxis, Tooltip, Scatter, Legend } from "recharts";

export interface ScatterPointData {
  x: number,
  y: number,
  z: number
}

export interface ScatterChartData {
  name: string,
  values: ScatterPointData[],
  fill: string
}

export interface ScatterChartParams {
  width: number,
  height: number,
  data: ScatterChartData[],
  xAxisName: string,
  xAxisUnit: string,
  yAxisName: string,
  yAxisUnit: string,
  zAxisName: string,
  zAxisUnit: string,
  grid?: boolean,
  tooltip?: boolean,
  legend?: boolean,
  syncId?: string | number,
  margin?: Margin,
  onClick?: CategoricalChartFunc
}

const ScatterChart = (props: Readonly<ScatterChartParams>) => {
  const darkMode = useDarkMode();
  const stroke = darkMode ? "var(--dark-text)" : "var(--light-text)";

  return (
    <Inner width={props.width} height={props.height} syncId={props.syncId} margin={props.margin} onClick={props.onClick}>
      {props.grid ? <CartesianGrid strokeDasharray="3 3" stroke={stroke} /> : ""}
      <XAxis dataKey="x" name={props.xAxisName} unit={props.xAxisUnit} stroke={stroke} />
      <YAxis dataKey="y" name={props.yAxisName} unit={props.yAxisUnit} stroke={stroke} />
      <ZAxis dataKey="z" name={props.zAxisName} unit={props.zAxisUnit} />
      {props.tooltip ? <Tooltip wrapperClassName={`bg-${darkMode ? "dark" : "light"}`} itemStyle={{ color: stroke }} cursor={{ stroke: stroke }} /> : ""}
      {props.data.map((x, index) => <Scatter name={x.name} data={x.values} fill={x.fill} key={index} />)}
      {props.legend ? <Legend /> : ""}
    </Inner>
  );
};

export default ScatterChart;
