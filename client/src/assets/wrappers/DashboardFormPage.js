import styled from 'styled-components'

const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 100%;
  background: var(--white);
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);
  h3 {
    margin-top: 0;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
  .btn-container {
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 0.5rem;
    button {
      height: 35px;
    }
  }
  .clear-btn {
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: var(--black);
  }
  .select {
    width: 200px;
    max-width: 100%;
  }
  .status {
    width: 200px;
    max-width: 100%;
  }
  .Stuck {
    color: var(--red-dark);
    background: var(--red-light);
    text-align: center;
  }
  .Working {
    text-align: center;
    background: #fcefc7;
    color: #e9b949;
  }
  .Done {
    text-align: center;
    color: var(--green-dark);
    background: var(--green-light);
  }
  .height {
    font-size: 20px;
  }
  .delete-btn {
    color: var(--red-dark);
    background: var(--red-light);
  }
  .two {
    column-gap: 1rem;
    display: grid;
    row-gap: 0.5rem;
    grid-template-columns: 1fr 1fr;
  }
  .one {
    display: grid;
    row-gap: 0.5rem;
    grid-template-columns: 1fr;
    padding: 0.375rem 0;
  }
  .bottomLine {
    border-bottom: 1px solid var(--grey-50);
  }
  .labelText {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
    display: grid;
    row-gap: 0.5rem;
    letter-spacing: var(--letterSpacing);
  }
  .singleLabel {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
    display: grid;
    row-gap: 0.5rem;
    letter-spacing: var(--letterSpacing);
  }
  .spacing {
    padding: 0.75rem 0;
  }
  .bigger {
    font-size: 150%;
  }
  .profile {
    display: grid;
    row-gap: 0.5rem;
  }
  @media (min-width: 0px) {
    .labelText {
      display: none;
    }
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
    .profile { 
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
    .singleLabel {
      display: block;
    }
    .btn-container {
      margin-top: 0;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 3fr 1fr 1fr 2fr;
    }
    .profile {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .singleLabel {
      display: none;
    }
    .labelText {
      grid-template-columns: 3fr 1fr 1fr 2fr;
      display: grid;
    }
    .form-center button {
      margin-top: 0;
    }
  }
`

export default Wrapper