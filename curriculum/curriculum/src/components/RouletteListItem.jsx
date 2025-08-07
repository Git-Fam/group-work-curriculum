import React from 'react'

const RouletteListItem = () => {
  return (
    <tr>
        <td className='titleTD'>〇〇〇〇〇〇〇〇〇〇〇</td>
        <td className='dateTD'>2025/01/01</td>
        <td><button className='ediButton'>編集</button></td>
        <td><button>削除</button></td>
    </tr>
  )
}

export default RouletteListItem;