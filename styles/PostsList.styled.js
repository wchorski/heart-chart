import styled from 'styled-components'


export const StyledPostsList = styled.div`
  // padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  .excerpt{
    background-color: var(--color-base);
    box-shadow: black 2px 2px 6px;
    padding: 1rem;
    margin: 0 .5rem .5rem 0;
    border-radius: .3rem;

    width: 25rem;
    height: 20rem;

    position: relative;
    cursor: pointer;

    &:hover{
      box-shadow: black 2px 2px 12px;
      h3{
        color: var(--color-text);
      }
      .readmore{
        color: var(--color-alt);
      }
      // p{
      //   color: var(--color-text);
      // }
    }

    h3{
      text-decoration: underline; 
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .author{
      color: grey;
    }
    

    p{
      color: var(--color-text);
      margin-top: 1rem;
      
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
      
    }

    .readmore{
      color: var(--color-highlight);
      padding: 1rem;
      margin: .2rem;
      position: absolute;
      bottom: 0;
    }
  }
`