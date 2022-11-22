"use strict";
const queryBotones=document.querySelectorAll(".boton")
let numeroPregunta ;
let puntos=0
const queryPregunta=document.querySelector("#pregunta")
let queryPuntos = document.querySelector("#puntos span")
let queryPuntosSpam=document.querySelector("#puntos")
let queryBoton1Apagar=document.querySelector("#boton1")
let queryBoton2Apagar=document.querySelector("#boton2")
let queryBoton3Apagar=document.querySelector("#boton3")
let queryBoton4Apagar=document.querySelector("#boton4")
let acumulacion=[]




//////////////////////////////////////////////

function numeroAleatorio(){
    
    
    let num = Math.floor(Math.random()*49)
    
            
            if(acumulacion.includes(num))
            {
                numeroAleatorio()
    
            
            }
            else
            {
                acumulacion.push(num)

                return numeroPregunta=num
            }
                
                
                
            
            
        
        
        console.log(acumulacion);
    
        
    }
    //////////////////////////////////////////////////

    async function getData(ruta){

        const response = await fetch(ruta)
    
        const data = await response.json()
    
        return data
    }
    
    
      // Petición a archivo JSON

    
    const data =getData("./json.json")

    ///////////////////////////////
    

    async function preguntaAleatoria(){
        let arrayJson =await data//aqui tengo un array con el json
        console.log(arrayJson);
        numeroAleatorio()
        let pregunta =arrayJson[numeroPregunta]
        console.log(pregunta);
        
        pintarPregunta(pregunta)

    

    }
    ////////////////////////////////
    
    preguntaAleatoria()

    
    

    
    /////////////////////////////////////
    function pintarPregunta({question,answers})
    {
        console.log(question,answers);
        queryPregunta.textContent=question
        console.log(queryPregunta);
        
        for(let i=0;i<queryBotones.length;i++){
            
            queryBotones[i].textContent=answers[i]
        }


        
    }
    /////////////////////////

    async function presBoton(evento){
        
        
        let textoRespuestas=evento.target.textContent
        let arrayJson =await data
        let pregunta =arrayJson[numeroPregunta]
        console.log(pregunta.correct);
        
        
        if(pregunta.correct===textoRespuestas)
        {
            console.log(pregunta.correct);
            console.log(acumulacion.length);
            puntos++
            queryPuntos.textContent=puntos   
            queryPuntos.classList.remove("animacion")  
            queryPuntos.offsetWidth 
            
            

            queryPuntos.classList.add("animacion")            
        }
        if(acumulacion.length>=49){

            queryPuntosSpam.textContent="PUNTUACION FINAL: " +puntos+"/50"
            apagarBoton()
            queryPuntosSpam.style.animation="tamaño 2s"
            setTimeout("location.reload()",5000);
           
           
           
        }    
        else{
            
            preguntaAleatoria()  
        }
    }
    
    
    /////////////////////////
    for(let i=0;i<queryBotones.length;i++)
    {
        queryBotones[i].addEventListener("click",presBoton)
    }

function apagarBoton()
    {
        queryBoton1Apagar.disabled=true
        queryBoton2Apagar.disabled=true
        queryBoton3Apagar.disabled=true
        queryBoton4Apagar.disabled=true
    }

    






    

    




    
    

    

    







