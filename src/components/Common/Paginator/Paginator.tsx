import React from 'react'

type PropsType = {
   pages: Array<number>
   currentPage: number
   onPageChanged: (newPage: number) => void
   pagesCount: number
   paginationItemStyle: string
   activeItemStyle: string
   paginationDivStyle: string
}

const Paginator: React.FC<PropsType> = ({ pages, currentPage, onPageChanged,
                                          pagesCount, paginationItemStyle,
                                          paginationDivStyle, activeItemStyle
                                       }) => {
   const BeginButton = () => {
      if (currentPage > 1) {return (
          <span onClick={() => onPageChanged(1)} className={paginationItemStyle}>{`<<`}</span>
      )} else {return null}
  }
  const EndButton = () => {
      if (currentPage < pagesCount) {return (
          <span onClick={() => onPageChanged(pagesCount)} className={paginationItemStyle}>{`>>`}</span>
      )} else {return null}
  }
  
   return (
      <div className={paginationDivStyle}>
         {<BeginButton />}
         {pages.map(p => {
            if (currentPage - p > 5 || currentPage - p < -5) {
               return '';
            }
            return (
               <span
                  key={p}
                  onClick={() => onPageChanged(p)}
                  className={`${paginationItemStyle} ${currentPage === p ? activeItemStyle : ''}`}
               >{p}</span>
            )
         })}
         {<EndButton />}
      </div>
   )
}

export default Paginator