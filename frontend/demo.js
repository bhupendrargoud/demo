data1=[
 
  {
    "Name" : "Pathfinder CDS",
    "Cost" : "₹400",
    "Publisher" : "Arihant Publications",
    "Description" : "A book prepared under UPSC guidliness with more than 8000 MCQs." 
  },
  
  {
    "Name" : "The Night At Deoli",
    "Cost" : "₹125",
    "Publisher" : "Penguin",
    "Author" : "Ruskin Bond",
    "Description" : "Book with simple heart-warming and thought provoking stories will take you to heavenly grounds of Dehradun and Mussoorie." 
  },
    
    {
      "Name" : "The Complete Novels of Sherlock Holmes",
      "Cost" : "₹500",
      "Publisher" : "Fingerprint Publication",
      "Author" : "Sir Arthur Conan Doyle",
      "Description" : "This book is a collection of four novels written by Sir Arthur Conan Doyle."
    },
    
    {
      "Name" : "Valmikis Ramayana",
      "Cost" : "₹1400",
      "Publisher" : "Amar Chitra Katha",
      "Author" : "Harini Gopalswami Srinivasan",
      "Description" : "The Ramayana which is a 6 volume set beautifully illustrated and researched ACK Ramayana brings alive the characters of the world's greatest epic."
    },
    
    {
      "Name" : "Mahabaratha Vol 1,2,3",
      "Cost" : "₹1600",
      "Publisher" : "Amar Chitra Katha Private Limited",
      "Author" : "Anant Pai",
      "Description" : "The Mahabaratha is a story of brotherhood deciet love and sacrifice.It is also the setting for the Gita, Lord Krishna's discourse of dharma."
    },
    
    {
      "Name" : "The Diary of a Young Girl",
      "Cost" : "₹90",
      "Publisher" : "Fingerprint Publishing Classic edition",
      "Author" : "Anne Frank",
      "Description" : "This book is the diary of young girl Anne Frank.The story begin's on Anne's 13th birthday when she gets a diary."
    },
    
    {
     "Name" : "Treasure Island",
      "Cost" : "₹140",
      "Publisher" : "Fingerprint Publishing first edition",
      "Author" : "Robert Louis Stevenson",
      "Description" : "This is the treasure Island anf if you don't think of all this ,the pirates will hunt you down and feed you to the sharks."
    },
    
    {
      "Name" : "Journey to the Centre of the Earth",
      "Cost" : "₹150",
      "Publisher" : "Fingerprint Publishing Latest edition",
      "Author" : "Jules Verne",
      "Description" : "Professor Leidenbrock, a man of incredible impatience and Axel, his unadventuorous nephew, come across a coded note in an originic runic manuscript of an Icelandic saga."
    },
    
    {
      "Name" : "The Alchemist",
      "Cost" : "₹320",
      "Publisher" : "Harper; Later Printing Edition",
      "Author" : "Paulo Coelho",
      "Description" : "This book is about an Andalusian shepherd boy named Santiago who travels from his homeland in Spain to the Egyptian desert in serach of a treasure burried in pyramids."
    },
    
    {
      "Name" : "400 Days",
      "Cost" : "₹155",
      "Publisher" : "Westland",
      "Author" : "Chetan Bhagat",
      "Description" : "A mystery and Romance story like no other."
    },
    
    {
      "Name" : "Making India Awesome",
      "Cost" : "₹78",
      "Publisher" : "Rupa Publications",
      "Author" : "Chetan Bhagat",
      "Description" : "A book that showers light on India's most obstinate snags -unemployement, violence,illiteracy." 
    },
    
    {
      "Name" : "1984",
      "Cost" : "₹199",
      "Publisher" : "Fingerprint Publishing", 
      "Author" : "George Orwell",
      "Description" : "1984 is a brilliant, and more importantly, a timeless satirical attack on the social and political structures of the world." 
    },
    
    {
      "Name" : "The Time Machine",
      "Cost" : "₹195",
      "Publisher" : "Fingerprint Publishing",
      "Author" : "H.G.Wells",
      "Description" : "A compelling science fiction,with first-hand account of a time travellers journey to the future." 
    },
    
    {
      "Name" : "Three Thousand Stitches",
      "Cost" : "₹185",
      "Publisher" : "Penguin Random House India",
      "Author" : "Sudha Muurty",
      "Description" : "So often, it's the simplest acts of courage that touch the lives of others."
    },
    
    {
      "Name" : "Wise and Otherwise",
      "Cost" : "₹255",
      "Publisher" : "Penguin India",
      "Author" : "Sudha Murty",
      "Description" : "Understanding human and human nature."
    }
    
   ]
function bk_data(){
  bk_da(data1)
}


     function bk_da(data)
     {
        table="<table align=center><tr><th>book_NAME</th><th>book_NAME</th><th>cost</th><th>auth</th><th>pub</th><th>des</th></tr>";
        for (var i = 0; i < data.length; i++) {
            table+="<tr><td>"+"<img class='book_image' src='./Images/"+data[i].Name+".png' alt='no img'>"+"</td><td>"+data[i].Name+"</td><td>"+data[i].Cost+"</td><td>"+data[i].Author+"</td><td>"+data[i].Publisher+"</td><td>"+data[i].Description+"</td></tr>";

        }
        table+="</table>"
    
        document.getElementById("b_data").innerHTML=table;
     }


     function bk_getall()
     {
      console.log("Show books");
      let fres = fetch("http://localhost:8080/book/get_all_books");
      fres.then(function (response) {
              return response.json();
          })
          .then(function (data) {
            bk_da(data);
          })
          .catch(function (err) {
              console.log('error: ' + err);
          });

          function bk_da(data)
          {
            var table="" 
             for (var i = 0; i < data.length; i++) {
               table+= "<div class='card'>"
               table+= "<img src='./Images/"+data[i].name+".png' alt='no img><br><br>"
               table+="<div class='title'> "+data[i].name+" <div><label>Quantity: </label> <select><option>1</option><option>2</option><option>3</option><option>4</option>ption>5</option> </select></div><br><input id='button' type='submit' value='BUY NOW' onclick='buy_now()'></div></div><br><br><br>"
  
     
             }
            
         
             document.getElementById("b_data").innerHTML=table;
          }

         
      
}
  function buy_now()
  {
    var url="login2.html";
    window.location.replace(url);

  }   


     function bk_deleall()
     {


         console.log(" delete all");

         
         let url="http://localhost:8080/book//delete_all";

         let fr= fetch(url,{method: 'DELETE'})
         .then(function (d) {
             console.log("success"+ d)
          
         })
         .catch(function (err) {
             console.log('error: ' + err);
            
         });

     }


     function add_book(){
       console.log("add_book")
       var name=document.getElementById("ab_bn").value;
       var cost=document.getElementById("ab_co").value;
       var auth=document.getElementById("ab_au").value;
       var pub=document.getElementById("ab_pub").value;
       var desc=document.getElementById("ab_des").value;
       save_book(name,cost,pub,auth,desc);
     }
     function bk_ds()
     {
      var i
       
        for ( i = 0; i < data1.length; i++) {
           save_book(data1[i].Name,data1[i].Cost,data1[i].Publisher,data1[i].Author,data1[i].Description)
    
        }



      }

  function save_book(b_name,b_cost,b_pub,b_aut,b_des){

    console.log("save_book");

        var data =
        {

          
            "name": b_name,
            "cost": b_cost,
            "publisher": b_pub,
            "author": b_aut,
            "description": b_des
        
        }

    let options = {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    }

    let fres = fetch("http://localhost:8080/book/save",options);
    fres.then(res => res.json()).then(d => {
        console.log("success"+ d);
      alert("Book added sucesfully")
        
    })
}


function bk_search()
{
  console.log("search book");
  var bkn=document.getElementById("bkname").value;
  let url="http://localhost:8080/book/get_books_by_name/"+bkn;
            
  let fr=fetch(url,{method: 'GET'})
  fr.then(function (response) {
  return response.json();
})
.then(data => {
  console.log("success")
 bk_da(data);    
})

function bk_da(data)
{
   table="<table align=center><tr><th>book_NAME</th><th>book_NAME</th><th>cost</th><th>auth</th><th>pub</th><th>des</th></tr>";
   
       table+="<tr><td>"+"<img src='./Images/"+data.name+".png' alt='no img'>"+"</td><td>"+data.name+"</td><td>"+data.cost+"</td><td>"+data.author+"</td><td>"+data.publisher+"</td><td>"+data.description+"</td></tr>";
  table+="</table>"

   document.getElementById("b_data").innerHTML=table;
}

}

function bk_delete()
{
  console.log("delete book");
  var bkn=document.getElementById("b_dlt").value;
  let url="http://localhost:8080/book//delete_name/"+bkn;

  let fr= fetch(url,{method: 'DELETE'})
  .then(function (d) {
      console.log("success"+ d)
      alert("Book deleted sucessfully")
     
  })
}

