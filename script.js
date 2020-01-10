
(function main() {


    var csv;
    var rows;
    var current_page = 1;
    var records_per_page = 5;
    const input = document.querySelector('input[type="file"]');
    var listing_table = document.getElementById("listingTable");
    const prev_button = document.getElementById("btn_prev");
    const next_button = document.getElementById("btn_next");
    
    
    
    
    function handleFileUpload() {
        console.log(input.files);
        const reader = new FileReader();
        reader.onload = function () {
            csv = reader.result.split('\n');
            rows = csv.slice(1,csv.length);
            changePage(1);  
               
        }
        reader.readAsText(input.files[0]);
    }
    
    function handlePrev()
    {
        if (current_page > 1) {
            current_page--;
            changePage(current_page);
        }
    }
    
    function handleNext()
    {
        if (current_page < numPages()) {
            current_page++;
            changePage(current_page);
        }
    }
    
    function changePage(page)
    {
    
        
        var content = "";
        content += "<thead><tr>";
        var row = csv[0].split(',');

        
        // Table Header
        for(var a = 0; a < row.length; a++)
        {
            content += '<th>' + row[a] + '</th>';
        }
        content += "</thead></tr>";


        // Table Rows
        for (var i = (page-1) * records_per_page; i < (page * records_per_page) && i < rows.length; i++) {
            var line = rows[i].split(',');
            content += '<tr>'
            for(var j = 0; j < line.length; j++)
            {
                content += '<td>' + line[j] + '</td>';
            }
            content += '</tr>';
            listing_table.innerHTML = content;
        }
        

        // Next and Previous btn visibility 
        if (page == 1) {
            btn_prev.style.visibility = "hidden";
        } else {
            btn_prev.style.visibility = "visible";
        }
    
        if (page == numPages()) {
            btn_next.style.visibility = "hidden";
        } else {
            btn_next.style.visibility = "visible";
        }
    
    }
    
        
    function numPages()
    {
        return Math.ceil(rows.length / records_per_page);

    }
    
    input.addEventListener('change',handleFileUpload );
    prev_button.addEventListener("click", handlePrev ) ;
    next_button.addEventListener("click", handleNext ); 
    
    })()