// Setting the constants first then load them into the sorting functions
// I used code with harry and w3schhools site to write the js. 
// This was difficult as we were not able to find relevant js videos for this sorting 
const currentDate = new Date();
const cardgrid = document.getElementById("cardgrid");
const numproducts = document.getElementById("numproducts");
const delivery = document.getElementById("delivery");
const alpha = document.getElementById("alphabet");
const price = document.getElementById("price");
const rank = document.getElementsByClassName("rank");

// Information of the products which are constants
const shoeInfo = [
  {
    shoeName: "Shoe Name 1",
    shoePrice: 2350,
    starRating: 5.0,
    deliveryTime: new Date("5 Mar 2022"),
    shoeImg: "blushoe.png",
  },
  {
    shoeName: "Shoe Name 2",
    shoePrice: 1350,
    starRating: 3.0,
    deliveryTime: new Date("2 Mar 2022"),
    shoeImg: "skyblushoe.png",
  },
  {
    shoeName: "Shoe Name 3",
    shoePrice: 2250,
    starRating: 4.5,
    deliveryTime: new Date("1 Mar 2022"),
    shoeImg: "whiteshoe.png",
  },
  {
    shoeName: "Shoe Name 4",
    shoePrice: 999,
    starRating: 5.0,
    deliveryTime: new Date("1 Apr 2022"),
    shoeImg: "blushoe.png",
  },
  {
    shoeName: "Shoe Name 5",
    shoePrice: 2000,
    starRating: 4.0,
    deliveryTime: new Date("2 Apr 2022"),
    shoeImg: "skyblushoe.png",
  },
  {
    shoeName: "Shoe Name 6",
    shoePrice: 2500,
    starRating: 3.5,
    deliveryTime: new Date("12 Mar 2022"),
    shoeImg: "whiteshoe.png",
  },
  {
    shoeName: "Shoe Name 7",
    shoePrice: 700,
    starRating: 2.0,
    deliveryTime: new Date("13 Mar 2022"),
    shoeImg: "blushoe.png",
  },
  {
    shoeName: "Shoe Name 8",
    shoePrice: 1200,
    starRating: 1.0,
    deliveryTime: new Date("15 Apr 2022"),
    shoeImg: "skyblushoe.png",
  },
  {
    shoeName: "Shoe Name 9",
    shoePrice: 1500,
    starRating: 2.5,
    deliveryTime: new Date("22 Apr 2022"),
    shoeImg: "whiteshoe.png",
  },
];

// Card will show in the stage of cardgrid where element is set as a parameter 
const cardGenerator = (element) => {
  return `
  <div class="shoecard">
            <div class="image"><img class="shoe1" src="./${element.shoeImg}" alt="shoe3"></div>
            <div class="detail">
              <div class="review"><h4>${element.shoeName}</h4><h2>${element.shoePrice}</h2><p>Delivery by: ${element.deliveryTime.toDateString()}</p></div>
              <div class="rating"><div class="rate"><p>⭐ ${element.starRating}</p></div></div>
            </div>
    </div>`;
};

// In order to sort in the alphabatical order
alpha.addEventListener("click", () => {
  console.log("click on alpha");
  cardgrid.innerHTML = " ";
  const alphaSort = (first, second) => {
    if (first.shoeName > second.shoeName) {
      return 1;
    } else if (first.shoeName < second.shoeName) {
      return -1;
    } else {
      return 0;
    }
  };

  numproducts.innerHTML = 9;
  shoeInfo.sort(alphaSort).forEach((element) => {
    cardgrid.innerHTML += cardGenerator(element);
  });
});

//To sort in price from highest to lowest
price.addEventListener("click", () => {
  console.log("click on price");
  cardgrid.innerHTML = " ";
  const priceSort = (first, second) => {
    if (parseInt(first.shoePrice) > parseInt(second.shoePrice)) {
      return -1;
    } else if (parseInt(first.shoePrice) < parseInt(second.shoePrice)) {
      return 1;
    } else {
      return 0;
    }
  };

  numproducts.innerHTML = 9;
  shoeInfo.sort(priceSort).forEach((element) => {
    cardgrid.innerHTML += cardGenerator(element);
  });
});

//Sorting according to time, it may be having an error 
delivery.addEventListener("click", () => {
  cardgrid.innerHTML = " ";

  const deliveryTimeSort = (first, second) => {
    if (first.deliveryTime - currentDate > second.deliveryTime - currentDate) {
      return 1;
    } else if (
      first.deliveryTime - currentDate <
      second.deliveryTime - currentDate
    ) {
      return -1;
    } else {
      return 0;
    }
  };

  numproducts.innerHTML = 9;
  shoeInfo.sort(deliveryTimeSort).forEach((element) => {
    cardgrid.innerHTML += cardGenerator(element);
  });
});

// Click event is used for filtering
Array.from(rank).forEach((element) => {
  element.addEventListener("click", (e) => {
    cardgrid.innerHTML = " ";
    let i = 0;
    const targetRank = parseInt(e.target.innerHTML.split("")[0]);

    shoeInfo.forEach((element) => {
      if (parseInt(element.starRating) == targetRank) {
        cardgrid.innerHTML += cardGenerator(element);
        i += 1;
      }
    });

    numproducts.innerHTML = i;
  });
});

// The card grid element will show the new cards here 
shoeInfo.forEach((element) => {
  cardgrid.innerHTML += cardGenerator(element);
});