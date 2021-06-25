import React from 'react'
import { PieChart } from 'react-native-svg-charts'
import { Text } from 'react-native-svg'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface ChartParams {
  new_confirmed?: number;
  new_deaths?: number;
}

export function PieChartWithCenteredLabels({ new_confirmed = 30, new_deaths = 40}: ChartParams) {

  const data = [

    {
      key: 2,
      amount: new_confirmed,
      svg: { fill: colors.green }
    },
    {
      key: 3,
      amount: new_deaths,
      svg: { fill: colors.red }
    },
  ]

  const Labels = ({ slices }) => {
    return slices.map((slice, index) => {
      const { pieCentroid, data } = slice;
      return (
        <Text
          key={index}
          x={pieCentroid[0]}
          y={pieCentroid[1]}
          fill={'white'}
          textAnchor={'middle'}
          alignmentBaseline={'middle'}
          fontSize={16}
          stroke={'black'}
          fontWeight='bold'
          strokeWidth={0.3}
        >
          {Intl.NumberFormat().format(data.amount)}
        </Text>
      )
    })
  }

  return (
    <PieChart
      style={{ height: '40%' }}
      valueAccessor={({ item }) => item.amount}
      contentInset={ { top: 30, bottom: 30 } }
      data={data}
      outerRadius={'95%'}
      animate
      animationDuration={300}
      // innerRadius={'30%'}
    >
      <Labels />
    </PieChart>
  )


}
