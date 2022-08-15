import styled from 'styled-components'


export const StyledNavBar = styled.div`
  background-color: var(--color-nav);
  width: 100%;
  /* background-color: var(--color-base); */
  position: sticky;
  top: 0rem;
  /* margin-bottom: 1rem; */
  z-index: 500;


  .nav-bg-main{
    // width: 100%;
    max-width: var(--width-cont);
    margin: 0 auto;

    display: flex;
    flex-direction: column;
    // align-items: center;
    justify-content: flex-start;
    
    position: relative;
  }
  .nav-bg-sub{
    // background-color: #1a1a22;
    // box-shadow: #0000008a 3px 3px 5px;
    // max-width: var(--width-cont);
    // margin: 0 auto;
    position: absolute;
    top: 15px;
    right: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  nav.main{
    // border-left: solid whitesmoke 2px;
    // border-right: solid whitesmoke 2px;
    
    // margin: 0 auto;
    display: flex;
    align-items: center;
  
    a:hover{
      opacity: .6;
    }
  
    .App-logo{
      padding: .4rem;
      width: 70px;

  
      &:hover{
        opacity: .6;
      }
    }
    
    ul{
      list-style-type: none;
      display: flex;
      margin: 0;
      padding: 0;
  
      li{
        // height: 100%;
        display: flex;
        justify-content: center;
        align-items:center;
  
        a{
          font-size: 1rem;
          text-align: center;
          padding: 1rem .8rem;
          display: inline-block;
          text-decoration: none;
          // height: 200px;
  
          color: white;
        }
      }
      li:hover{
        background-color: var(--color-highlight);
        a{
          color: black;
        }
      }
    }
  }

  nav.sub{
    // border-left: solid whitesmoke 2px;
    // border-right: solid whitesmoke 2px;
    // width: var(--width-cont);
    // margin-bottom: .5rem;
    margin-left: auto;
    display: flex;

    // position: fixed;
    top: 3.4rem;

    > * {
      margin-right: 1rem;
    }

    a{
      color: white;
    }

    button{
      margin: 0;
      padding: 0;
    }

    ul{
      list-style-type: none;
      display: flex;
      justify-content: flex-end;
      padding: 0;
      margin: 0;
    }

    .btnSearch{
      padding: .3rem;
    }

    .userCred{
      background-color: var(--color-highlight);
      border-radius: 40px;
      
      padding: 0 .7rem;
      margin-left: 1rem;
      display: flex;
      align-items: center;
      


      // svg{
      //   font-size: 40px;
      //   margin-right: 1rem;
      // }

      span{
        font-size: 15px;
        color: grey;
        margin-right: 1rem;
      }
    }
  }
`