import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';

const chartSetting = {
    yAxis: [
        {
            label: 'total count',
        },
    ],
    width: 650,
    height: 370,

    sx: {
        [`.${axisClasses.left} .${axisClasses.label}`]: {
        },

    },
};
const dataset = [
    {
        london: 55,
        paris: 90,
        newYork: 20,
        month: 'Jan',
    },
    {
        london: 40,
        paris: 70,
        newYork: 30,
        month: 'Feb',
    },
    {
        london: 30,
        paris: 53,
        newYork: 23,
        month: 'Mar',
    },
    {
        london: 54,
        paris: 70,
        newYork: 11,
        month: 'Apr',
    },
    {
        london: 20,
        paris: 69,
        newYork: 7,
        month: 'May',
    },
    {
        london: 30,
        paris: 63,
        newYork: 19,
        month: 'June',
    },
    {
        london: 10,
        paris: 60,
        newYork: 8,
        month: 'July',
    },
    {
        london: 35,
        paris: 60,
        newYork: 5,
        month: 'Aug',
    },
    {
        london: 23,
        paris: 69,
        newYork: 30,
        month: 'Sept',
    },
    {
        london: 44,
        paris: 75,
        newYork: 10,
        month: 'Oct',
    },
    {
        london: 10,
        paris: 64,
        newYork: 20,
        month: 'Nov',
    },
    {
        london: 25,
        paris: 70,
        newYork: 30,
        month: 'Dec',
    },
];

const valueFormatter = (value) => `${value} clients`;

export default function BarGraph() {
    return (
        <BarChart
            dataset={dataset}
            xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
            series={[
                { dataKey: 'london', label: 'Added Clients', valueFormatter },
                { dataKey: 'paris', label: 'Renewed', valueFormatter },
                { dataKey: 'newYork', label: 'Revoked', valueFormatter },
            ]}
            {...chartSetting}


        />
    );
}
