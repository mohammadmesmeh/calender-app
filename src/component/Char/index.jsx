// #region Sample data
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis , ResponsiveContainer } from 'recharts';
import {chartData} from '../../Mock Data/data'


const margin = {
  top: 10,
  right: 10,
  left: 0,
  bottom: 0,
};
// #endregion

export  function CustomizeLegendAndTooltipStyle() {
  return (
    // <ResponsiveContainer width='100%' >
     <div className="w-full h-[350px] focus:outline-none">

    <BarChart width={600} height={300} data={chartData} margin={margin}>
      <XAxis dataKey="day" stroke="#94a3b8" />
      <YAxis  stroke="#94a3b8"/>
      <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
      <Legend
        width={100}
        wrapperStyle={{
          top: 40,
          right: 20,
          backgroundColor: '#f5f5f5',
          border: '1px solid #d5d5d5',
          borderRadius: 3,
          lineHeight: '40px',
        }}
      />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <Bar dataKey="Rate"  fill="#0ea5e9"  barSize={30} />
     
    </BarChart>
     </div>
    // </ResponsiveContainer >
  );
}