import React, { useState } from 'react'
import Pagination from 'react-bootstrap/Pagination';

function Footer({pageCount, setDataPage}) {
    const [initialPageNumber, setInitialPageNumber] = useState(1)
    const setDataPerPage = (data) => {
        setDataPage(data)
    }
    const moveToFirstPage = () => {
        setInitialPageNumber(1)
    }
    const moveToLastPage = () => {
        setInitialPageNumber(pageCount-2)
    }
    const changeNextPageNumber = () => {
        if(initialPageNumber < pageCount-2){
            setInitialPageNumber(initialPageNumber+1)
        }
    }
    const changePrevPageNumber = () => {
        if(initialPageNumber >= 2){
            setInitialPageNumber(initialPageNumber-1)
        }
        
    }

  return (
    <Pagination className='justify-content-center'>
      <Pagination.First onClick={()=> moveToFirstPage()} className={initialPageNumber === 1? 'disabled': 'show'}/>
      <Pagination.Prev onClick={()=>changePrevPageNumber()} className={initialPageNumber === 1? 'disabled': 'show'}/>
      <Pagination.Item onClick={()=>setDataPerPage(initialPageNumber)}>{initialPageNumber}</Pagination.Item>
      <Pagination.Item onClick={()=>setDataPerPage(initialPageNumber+1)}>{initialPageNumber+1}</Pagination.Item>
      <Pagination.Ellipsis />
      <Pagination.Item onClick={()=>setDataPerPage(pageCount)}>{pageCount}</Pagination.Item>
      <Pagination.Next onClick={()=>changeNextPageNumber()} className={initialPageNumber === pageCount-2? 'disabled': 'show'}/>
      <Pagination.Last onClick={()=>moveToLastPage()} className={initialPageNumber === pageCount-2? 'disabled': 'show'}/>
    </Pagination>
  )
}

export default Footer