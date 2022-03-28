$(document).ready(function(){

    $('form').on('submit', function(e){
        
        e.preventDefault();
        
        document.getElementById('preview').innerHTML = '';
        document.getElementById('table1').innerHTML = '';
        document.getElementById('hu').innerHTML = '';
        document.getElementById('chartDiv').innerHTML = '';

        const reader = new FileReader();
        
        document.getElementById('title').innerHTML = "The document opened is : " + document.getElementById("fileInput").files[0].name;
        
        reader.onload = function(event){
        
            //Getting the string of the cvs file
            let cvs = event.target.result;
            
            //Parsing the cvs file into an array of objects
            let data = $.csv.toArrays(cvs);
     
            document.getElementById('preview').appendChild(tableMatrix(data));

            document.getElementById('table1').appendChild(tableMatrix(sort4(optimist(data),pesimist(data),laplace(data),savage(data) )))

            hu = hurwitz(data);
            
            document.getElementById('hu').appendChild( tableMatrix(tableH( hu )) )

            graph(hu);

        };
        
        reader.readAsText(document.getElementById("fileInput").files[0])

    })

    function tableMatrix(mat){

        const table = document.createElement('table');

        for (let i = 0; i < mat.length; i++) { 
            let row = table.insertRow(-1);
            for (let j = 0; j < mat[i].length; j++) {
                let cell = row.insertCell(-1);
                cell.innerHTML = mat[i][j];
            }
        }

        return table;

    }

    function optimist(mat){
        
        var max = 0;  // = mat[2][1]
        var maxName = '';
        
        for (let i = 1; i < mat[2].length; i++) {
            if (mat[2][i] > max) {
                max = mat[2][i];
                maxName = mat[0][i];
            }
        }
        return `${maxName} (${max})`;

    }

    function pesimist(mat){

        var max = mat[1][1];
        var maxName = '';
        
        for (let i = 1; i < mat[1].length; i++) {
            if (mat[1][i] > max) {
                max = mat[1][i];
                maxName = mat[0][i];
            }
        }
        return `${maxName} (${max})`;

    }

    function laplace(mat) {
        
        var arrL = [];

        for (let i = 1; i < mat[0].length; i++){
            arrL.push(( parseFloat(mat[1][i]) + parseFloat(mat[2][i]) ) / 2 )
        }
        
        var max = 0; // arrL[0]
        var maxName = '';
        
        for (let i = 0; i < arrL.length; i++) {
            if (arrL[i] > max) {
                max = arrL[i];
                maxName = mat[0][i+1];
            }
        }

        return `${maxName} (${max})`

    }
    
    function savage(mat) {
        
        var maxa = 0; // = mat[1][1]
        var maxb = 0; // = mat[2][1]

        //First max
        for(let i = 1; i < mat[1].length; i++){
            if (mat[1][i] > maxa) maxa = mat[1][i]
        }

        //Second max
        for(let i = 1; i < mat[2].length; i++){
            if (mat[2][i] > maxb) maxb = mat[2][i]
        }

        //New arrays
        var arra = [];
        var arrb = [];

        for(let i = 1; i < mat[1].length; i++){
            arra.push(parseFloat(maxa) - parseFloat(mat[1][i]) )
        }

        for(let i = 1; i < mat[2].length; i++){
            arrb.push(parseFloat(maxb) - parseFloat(mat[2][i]) )
        }

        //Final array
        var arrmax = [];

        for(let i = 0; i < arra.length; i++){
           if(arra[i] > arrb[i]) arrmax.push(arra[i]); else arrmax.push(arrb[i]);
        }

        //Finding the smallest number in the final array
        var min = arrmax[0];
        var minName = '';

        for(let i = 0; i < arrmax.length; i++){
            if (arrmax[i] < min) {
                min = arrmax[i];
                minName = mat[0][i+1];
            }
        }

        return `${minName} (${min})`
    }

    function sort4(opt,pes,lap,sav) {
        var arr = [
            ["Optimist: ",opt],
            ["Pesimist: ",pes],
            ["Laplase: ",lap],
            ["Savage: ",sav]
        ]

        return arr;
    }

    function hurwitz(mat) {
        
        var series = [];

        for (let i = 1; i < mat[0].length; i++) {
            
           let a = mat[1][i];
           let b = mat[2][i]; 

           let points = [];
            
            for(let h=0.0; h < 1; h= h + 0.1){
                
                points.push([
                    Number((h).toFixed(1)),
                    (parseFloat(a)*(1-h) + parseFloat(b)*h)
                ])
            }

            let obj = {
                name: mat[0][i],
                points: points
            }

            series.push(obj);

        }

        return series;

    }
    
    function tableH(series){
        
        var mat = [];

        //Get the alternatives' names for the top part
        let alt = ["h"];

        for(let i=0; i < series.length; i++){
            alt.push(series[i].name);
        }

        mat.push(alt);

        //Get the values
        
        for( let j = 0; j < series[0].points.length; j++){

            let values = []
                values.push(series[0].points[j][0])

            for(let i = 0; i < series.length; i++){
                    values.push( Number(series[i].points[j][1]).toFixed(1) );
            }
            mat.push(values);
        }
        return mat;
    }

    function graph(series1) {

        var chart = JSC.chart('chartDiv', { 
            debug: true, 
            type: 'line', 
            legend_visible: true, 
            xAxis: { 
              crosshair_enabled: true, 
              scale: { type: 'auto' } 
            }, 
            yAxis: {}, 
            defaultSeries: { 
              firstPoint_label_text: '<b>%seriesName</b>', 
              defaultPoint_marker: { 
                type: 'circle', 
                size: 8, 
                fill: 'white', 
                outline: { width: 2, color: 'currentColor' } 
              } 
            },
            legend: {
                template: '%icon,%name',
                cellSpacing: 8,
              }, 
            title_label_text: 'Hurwitz method graphical preview', 
            series: series1
        
        }); 
    }
    
})
