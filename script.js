//ON PAGE LOAD
//-----------------------------------------

//making namesArray global
let namesArray = []
//making valuesArray global
let valuesArray = []

//intialising a default pie chart with a day range of 30
processData(30)


//Chart
let chartState = 'pie'
var ctx = document.getElementById('myChart').getContext('2d');
var mychart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'pie',

    // The data for our dataset
    data: {
        labels: [namesArray[0],namesArray[1],namesArray[2],namesArray[3],namesArray[4]],
        datasets: [{
            label: 'Summary Data',
            backgroundColor: 'rgb(255, 0, 0)',
            borderColor: 'rgb(0, 255, 132)',
            data: valuesArray
        }]
    },

    // Configuration options go here
    options: {
        responsive: false
    }
});

//-----------------------------------------------
//END OF ON PAGE LOAD



function updateChart(){
    let dayrange = document.getElementById('dayRange').value;
    processData(dayrange)

    mychart.destroy()
    if(chartState == 'pie'){
         mychart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'pie',
        
            // The data for our dataset 
            data: {
                labels: [namesArray[0],namesArray[1],namesArray[2],namesArray[3],namesArray[4]],
                datasets: [{
                    label: 'Summary Data',
                    backgroundColor: 'rgb(255, 0, 0)',
                    borderColor: 'rgb(0, 255, 132)',
                    data: valuesArray
                }]
            },
        
            // Configuration options go here
            options: {
                responsive: false
            }
        });
    }
    else {
             mychart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'bar',
        
            // The data for our dataset
            data: {
                labels: [namesArray[0],namesArray[1],namesArray[2],namesArray[3],namesArray[4]],
                datasets: [{
                    label: 'Summary Data',
                    backgroundColor: 'rgb(255, 0, 0)',
                    borderColor: 'rgb(0, 255, 132)',
                    data: valuesArray
                }]
            },
        
            // Configuration options go here
            options: {
                responsive: false
            }
        });
    }

}


function processData(dayRange){

namesArray = [];
valuesArray = [];


//Pushing all names into one array
for(i=0; i < dataset.rows.length; i++){
    namesArray.push(dataset.rows[i].userid)
}

//Changing the array to have no duplicates
namesArray = namesArray.filter(onlyUnique)


//intialising the good data array to push our data into
let goodData = []

//Adding up totals for each name
for(i=0; i < namesArray.length; i++){
    let name = namesArray[i];
    let url_count = getURLTotal(name, dayRange);

    let temp = [name, url_count]
    goodData.push(temp)
}


//Extracting the second column to parse to the chart
goodData.sort(compareSecondColumn);
function compareSecondColumn(a, b) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] > b[1]) ? -1 : 1;
    }
}



//restricting top 5
for(i=0; i < 5; i++){
    valuesArray.push(goodData[i][1])
}
}

//Functions 

//adds up url counts for a name
function getURLTotal(name, dayRange){
    let total = 0

    for(j=0; j < dataset.rows.length; j++){
        //name matches and day range matches
        if((dataset.rows[j].userid === name) && (dataset.rows[j].dayrange == dayRange)){
            total = total + dataset.rows[j].url_count
        }
    }

    return total
}

//for use in the filter function
function onlyUnique(value, index, self){
    return self.indexOf(value) === index;
}

function changeChart() {
    mychart.destroy();
    if(chartState == 'pie'){
            mychart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'bar',
        
            // The data for our dataset
            data: {
                labels: [namesArray[0],namesArray[1],namesArray[2],namesArray[3],namesArray[4]],
                datasets: [{
                    label: 'Summary Data',
                    backgroundColor: 'rgb(255, 0, 0)',
                    borderColor: 'rgb(0, 255, 132)',
                    data: valuesArray
                }]
            },
        
            // Configuration options go here
            options: {
                responsive: false
            }
        });

        chartState = 'bar'

    }
    else { 
        mychart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'pie',
        
            // The data for our dataset
            data: {
                labels: [namesArray[0],namesArray[1],namesArray[2],namesArray[3],namesArray[4]],
                datasets: [{
                    label: 'Summary Data',
                    backgroundColor: 'rgb(255, 0, 0)',
                    borderColor: 'rgb(0, 255, 132)',
                    data: valuesArray
                }]
            },
        
            // Configuration options go here
            options: {
                responsive: false
            }
        });
        chartState = 'pie'
    }
    


}


