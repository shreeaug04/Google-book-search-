import React from 'react';
import './App.css';

  class App extends React.Component {
  state = {
    search: "",
    print: "all",
    book: "",
    results: []
  }
  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({[e.target.name]:e.target.value})
    
  }
  handleSubmit = (e) => {
   e.preventDefault()
     let url = `https://www.googleapis.com/books/v1/volumes?q=${this.state.search}&printType=${this.state.print ||'all'}&apiKey=<AIzaSyBc3iz_v7kF34gTKhQOnF_v6PdNsIH_94E>`;
     if(this.state.book){
       url += `&filter=${this.state.book}`
     }
    //const url ='https://www.googleapis.com/books/v1/volumes?q=quilting&apiKey=<AIzaSyBc3iz_v7kF34gTKhQOnF_v6PdNsIH_94E>';
    fetch(url)
       .then(results =>{
         if(!results.ok){
           throw new Error('Something went wrong, please try again later');
         }
         return results.json();
       })
        .then(data => {
          console.log(data);
          this.setState({
            search: "",
            print: "all",
            book: "",
            results: data.items
          });
        })

        .catch(err => {
          this.setState({
            err: err.message
          });
        });
    }

    render() {
    return (
      <div >
        <header>
          <h1>Google Book Search</h1>
          <h2>Search</h2>

          <form onSubmit={this.handleSubmit}>
            <label>Search </label>
            <input name="search" value={this.state.search} type="text" onChange={this.handleChange} required/>
            <button type="submit">search</button>
            <br />

            <label>Print Type</label>
            <select name="print" value={this.state.print} onChange={this.handleChange} required>
              <option value="all">All</option>
              <option value="books">Book</option>
              <option value="magazines">Magazine</option>
              <option></option>
            </select>
            <br />

            <label>Book</label>
            <select name="book" value ={this.state.book} onChange={this.handleChange}>
              <option value="" >No Filter</option>
              <option value="free-ebooks">free ebook</option>
              <option value="paid-ebooks">paid ebook</option>
              <option></option>
           
            </select>
          </form>
        </header>
        <section>
          {
            this.state.results.map(result=>(
              <>
              <p>{result.volumeInfo.title}</p>
            <p>{result.volumeInfo.printType}</p>
            <p>{result.volumeInfo.imageLinks?.thumbail}</p>
            </>
            ))
          }
        </section>
      </div>
    );
  }
}



export default App;
