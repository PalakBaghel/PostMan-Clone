console.log("Welcome");

//utility functions
//utility function to get DOM element form string
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

//initialise no of parameters
let addParamsCount = 0;

let parametersBox = document.getElementById('parametersBox');
//abhi usse chupa do
//hide the parameter box initially
parametersBox.style.display = 'none';

//if user clicks on params box, hide the json box
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
})

//if user clicks on json box, hide the params box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('parametersBox').style.display = 'none';
    document.getElementById('requestJsonBox').style.display = 'block';
})

//if click on plus button, add more parameters
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = `   <div class="form-row my-2">
              <label for="url" class="col-sm-2 col-form-label">
              Parameter ${addParamsCount + 2}</label>
            <div class=" col-md-4">

                <input type="text" class="form-control" id="parameterKey${addParamsCount + 2}" 
                placeholder="Enter Parameter ${addParamsCount + 2} Key">
            </div>
            <div class=" col-md-4">

                <input type="text" class="form-control" id="parameterValue${addParamsCount + 2}"
                    placeholder="Enter Parameter ${addParamsCount + 2} Value">
            </div>
            <button  class="btn btn-primary deleteParam">
                -
            </button>
        </div>  `
    //convert the element string to dom node
    let paramElement = getElementFromString(string);
    //console.log(paramElement);
    params.appendChild(paramElement);

    //add an event listener to remove the parameter on clicking - button
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        })
    }
    addParamsCount++;
})

//if user clicks on submit button
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    //show please wait in the response box to request patience from the user
    document.getElementById('responseJsonText').value = "Please Wait..Fetching response.."

    //fetch all values user has entered
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name = 'requestType']:checked").value;
    let contentType = document.querySelector("input[name = 'contentType']:checked").value;
    //    console.log(url);
    //    console.log(requestType);
    //    console.log(contentType);

    //If use has used params option instead of json, collect all parameters in an object
    if (contentType == 'params') {
        //blank object
        data = {};
        for (i = 0; i < addParamsCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }

    else {
        data = document.getElementById('requestJsonText').value;
    }

    console.log(url);
    console.log(requestType);
    console.log(contentType);
    console.log(data);
    ///if requesttype is get, invoke fetch api to create a post request

    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET',
        })
            .then(response => response.text())
            .then((text) => {
                document.getElementById('responseJsonText').value = text;
            });
    }
    else {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
        })
            .then(response => response.text())
            .then((text) => {
                document.getElementById('responseJsonText').value = text;
            });
    }

})

