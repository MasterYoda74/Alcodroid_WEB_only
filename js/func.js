function CreateRequest()
{
    var Request = false;

    if (window.XMLHttpRequest)
    {
        //Gecko-совместимые браузеры, Safari, Konqueror
        Request = new XMLHttpRequest();
    }
    else if (window.ActiveXObject)
    {
        //Internet explorer
        try
        {
             Request = new ActiveXObject("Microsoft.XMLHTTP");
        }    
        catch (CatchException)
        {
             Request = new ActiveXObject("Msxml2.XMLHTTP");
        }
    }
    if (!Request)
    {
        alert("Невозможно создать XMLHttpRequest");
    }
    return Request;
} 

/*
Функция посылки запроса к файлу на сервере
r_method  - тип запроса: GET или POST
r_path    - путь к файлу
r_args    - аргументы вида a=1&b=2&c=3...
r_handler - функция-обработчик ответа от сервера
*/
function SendRequest(r_method, r_path, r_args, r_handler)
{
    //Создаём запрос
    var Request = CreateRequest();
    
    //Проверяем существование запроса еще раз
    if (!Request)
    {
        return;
    }
    
    //Назначаем пользовательский обработчик
    Request.onreadystatechange = function()
    {
        //Если обмен данными завершен
        if (Request.readyState == 4)
        {
            //Передаем управление обработчику пользователя
            r_handler(Request);
        }
    }
    
    //Проверяем, если требуется сделать GET-запрос
    if (r_method.toLowerCase() == "get" && r_args.length > 0)
    r_path += "?" + r_args;
    
    //Инициализируем соединение
    Request.open(r_method, r_path, true);
    
    if (r_method.toLowerCase() == "post")
    {
        //Если это POST-запрос
        
        //Устанавливаем заголовок
        Request.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=utf-8");
        //Посылаем запрос
        Request.send(r_args);
    }
    else
    {
        //Если это GET-запрос
        
        //Посылаем нуль-запрос
        Request.send(null);
    }
} 

function parseconfig(jsonobj) {
    //alert(jsonobj.responseText);
    var configJ = JSON.parse(jsonobj.responseText);
    if (configJ.isAP) {
        document.getElementById("isAP").setAttribute("checked","checked");
    } else {
        document.getElementById("isAP").removeAttribute("checked");
    }    
    document.getElementById("APSSID").value=configJ.APSSID;
    document.getElementById("APPASS").value=configJ.APPASS;
    document.getElementById("wifiSSID").value=configJ.wifiSSID;
    document.getElementById("wifiPASS").value=configJ.wifiPASS;
    document.getElementById("SMAX").value=configJ.servoMAX;
    document.getElementById("SMIN").value=configJ.servoMIN;
    document.getElementById("Steps").value=configJ.stepPerMl;
    document.getElementById("Start").value=configJ.startMl;
    document.getElementById("Feedback").value=configJ.feedback;
    document.getElementById("LED").value=configJ.ledbright;
}
function parseshots(jsonobj) {
    //alert(jsonobj.responseText);
    var configJ = JSON.parse(jsonobj.responseText);
    //alert(configJ.shots.length);
    var parent=document.getElementById("shots");
    for (i=0; i<configJ.shots.length; i++) {
        var newline=document.createElement('div');
        newline.className="container-fluid";
        var div1=document.createElement('div');
        div1.className="col-xs-6";
        var div2=document.createElement('div');
        div2.className="col-xs-4";
        var div3=document.createElement('div');
        div3.className="col-xs-2";        
        var newinput=document.createElement('div');
        newinput.className="form-control";
        //newinput.style="width: 40%;";
        //newinput.pattern="[0-9a-zA-Zа-яА-Я.\- ]{1,20}";
        newinput.innerText=configJ.shots[i].ID;
        div1.appendChild(newinput);
        newline.appendChild(div1);
        var newdoze=document.createElement('div');
        newdoze.className="form-control";
        newdoze.style="background-color: "+configJ.shots[i].color+";";
        div2.appendChild(newdoze);
        newline.appendChild(div2);
        var newbutt=document.createElement('div');
        newbutt.className="btn btn-block btn-success btn-plus";
        //newbutt.style="width: 25%;";
        newbutt.innerText="+";
        div3.appendChild(newbutt);
        newline.appendChild(div3);
        parent.insertBefore(newline,document.getElementById("new-shot"));
    }
}
function parseusers(jsonobj) {
    alert(jsonobj.responseText);
    var configJ = JSON.parse(jsonobj.responseText);
    alert(configJ.users.length);
    var parent=document.getElementById("users");
    for (i=0; i<configJ.users.length; i++) {
        var newline=document.createElement('div');
        newline.className="container-fluid no-gutters";
        var div1=document.createElement('div');
        div1.className="col-xs-12 id-num";
        div1.innerHTML="ID: <span>"+configJ.users[i].ID+"</span>";
        var div2=document.createElement('div');
        div2.className="col-xs-12 col-sm-4";
        var inpname=document.createElement('input');
        inpname.className="form-control";
        inpname.placeholder="Имя";
        inpname.value=configJ.users[i].name;
        div2.appendChild(inpname);
        var div3=document.createElement('div');
        div3.className="col-xs-5 col-sm-3"; 
        var newcolor=document.createElement('div');
        newcolor.className="form-control";
        newcolor.style="background-color: "+configJ.users[i].color+";";
        div3.appendChild(newcolor);
        var div4=document.createElement('div');
        div4.className="col-xs-5 col-sm-3";
        var newdoze=document.createElement('input');
        newdoze.type="number";
        newdoze.className="form-control";
        newdoze.placeholder="Доза";
        newdoze.min="5";
        newdoze.max="50";
        newdoze.step="5";
        newdoze.value=configJ.users[i].doze;
        div4.appendChild(newdoze);
        var div5=document.createElement('div');
        div5.className="col-xs-2 col-sm-2";
        var newbutt=document.createElement('div');
        newbutt.className="btn btn-block btn-danger btn-minus";
        newbutt.innerText="-";
        div5.appendChild(newbutt);
        newline.appendChild(div1);
        newline.appendChild(div2);
        newline.appendChild(div3);
        newline.appendChild(div4);
        newline.appendChild(div5);
        parent.appendChild(newline);
    }
}
SendRequest("GET","config.json","",parseconfig);
SendRequest("GET","shots.json","",parseshots);
SendRequest("GET","users.json","",parseusers);