import styled from 'styled-components'


export const StyledGigTable = styled.div`

  .formErr{
    background-color: #ff0000ad;
    padding: .2rem 1rem;
    border-bottom: solid 3px red;
  }
  
  .postTable{
    // background-color: var(--color-highlight);
    display: flex;
    justify-content: center;
  }
  table{
    /* background-color: var(--color-highlight); */
    outline: solid var(--color-base) 2px;
    padding: .5rem;
    text-align: left;
    width: 90%;
    border-collapse: collapse;
  }
  .header{
    border: solid black 3px;
  }

  th{
    border: solid black 1px;
    color: black;
    padding: 1rem .5rem;
  }
  td{
    // border: solid rgba(0, 0, 0, 0.529) 1px;
    padding: .5rem;
  }

  thead{
    background-color: var(--color-highlight); 
  }

  tbody{

    tr:nth-child(odd){
      background-color: var(--color-base);
    }
    tr:nth-child(even){
      background-color: #353546;
    }
    tr:hover{
      background-color: #354646;
    }
  }


  tfoot{
    background-color: var(--color-highlight);
    color: black;
    border: solid black 1px;
  }

  .card{
    background-color: #468f9e;
    border-radius: 1rem;
    text-align: left;
    padding: 1rem 1.8rem;
  
    margin: .3rem;
  }

  .clientInfo{
    background-color: var(--color-base);
    padding: 3rem;

    th{
      background-color: var(--color-highlight);
    }
  }
`