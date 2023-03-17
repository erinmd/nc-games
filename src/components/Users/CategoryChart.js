import React, { useContext, useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { getUserVoteCategories } from '../../utils/api'
import { UserContext } from '../../contexts/User'

export const CategoryChart = () => {
  const { user } = useContext(UserContext)

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  )

  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      }
    },
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false
      }
    }
  }

  const labels = [
    'Strategy',
    'Hidden roles',
    'Dexterity',
    'Push your luck',
    'Roll and write',
    'Deck building',
    'Engine building'
  ]

  const [categoryScores, setCategoryScores] = useState([0, 0, 0, 0, 0, 0, 0])

  useEffect(() => {

    const startingScores = [0, 0, 0, 0, 0, 0, 0]

    const categoryOptions = [
      'strategy',
      'hidden-roles',
      'dexterity',
      'push-your-luck',
      'roll-and-write',
      'deck-building',
      'engine-building'
    ]

    getUserVoteCategories(user.username).then(userVoteCategories => {
      userVoteCategories.likes.forEach(category => {
        const index = categoryOptions.indexOf(category)
        startingScores[index] += 1
      })
      userVoteCategories.dislikes.forEach(category => {
        const index = categoryOptions.indexOf(category)
        startingScores[index] += -1
      })
      setCategoryScores(startingScores)
    })
  },[user.username])

  const data = {
    labels,
    datasets: [
      {
        data: categoryScores,
        borderColor: '#009999',
        backgroundColor: '#00999970'
      }
    ]
  }

  return <Bar className='chart' options={options} data={data} />
}
