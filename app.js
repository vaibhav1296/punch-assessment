const readline = require('readline');

// an object to store the family tree
const familyTree = {};

// interface to take input from terminal
const readLineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * some valid input strings that will be there in every input
 */

const validKeys = ["add", "connect", "count", "father", "son", "wife", "daughter", "print", "husband"]
const validRelations = []

/**
 * 
 * @param {*} argsArr 
 * argArr will be having all the input strings in an array. 
 * this function will add a key named ( person name )
 * in familyTree and add a new relation
 * 
 */

const addNewPerson = (argsArr)=>{
  if(!["person", "relationship"].includes(argsArr[1])){
    console.log("Invalid Command")
  }else{
    if(argsArr[1] === "person"){
      const name = argsArr.slice(2).join(" ")
      familyTree[name] = {}
    }else{
      const relation = argsArr.slice(2).join(" ")
      validRelations.push(relation)
    }
  }

  

}

/**
 * 
 * @param {*} argsArr 
 * this will connect two persons
 * 
 * first we will check for validations
 * 
 * now it will first search both names then
 * 
 * if we will add a son it will add a son in respective father's object sons array
 * same will happen for daughter and wife
 * 
 * assuming a person can have multiple wives
 */

const connectPersons = (argsArr)=>{
  //we will first check if the recieved relationship in connect command is added in valid relations array or not
  let flag = true
  for(let i=0; i<validRelations.length; i++){
    if(argsArr.includes(validRelations[i])){
      flag = false
    }
  }
  if(flag){
    console.log("Invalid relation first add this relation")
  }else{
    // check if both person exists or not
    const indOfAs = argsArr.indexOf("as")
    const indOf = argsArr.indexOf("of")
    const ind = indOfAs+1
    const relationName = argsArr[ind]
    const name1 = argsArr.slice(1, indOfAs).join(" ")
    const name2 = argsArr.slice(indOf+1).join(" ")
    const personArr = Object.keys(familyTree)
    
    if(personArr.includes(name1) && personArr.includes(name2)){
      if(relationName === "son"){
        // familyTree[name1]["father"] = name2
        if(familyTree[name2]["sons"]){
          familyTree[name2]["sons"].push(name1)
        }else{
          familyTree[name2]["sons"] = [name1]
        }
      }else if(relationName === "daughter"){
        // familyTree[name1]["father"] = name2
        if(familyTree[name2]["daughters"]){
          if(!familyTree[name2]["daughters"].includes(name1)) familyTree[name2]["daughters"].push(name1)
          
        }else{
          familyTree[name2]["daughters"] = [name1]
        }
      }else if(relationName === "father"){
        familyTree[name2]["father"] = name1
        // now we don't know the gender so we can not justify if name1 is a daughter or son
        //so we will just add father relation
      }else if(relationName === "wife"){
        if(familyTree[name2]["wives"]){
          if(familyTree[name2]["wives"]){
            if(!familyTree[name2]["wives"].includes(name1)) familyTree[name2]["wives"].push(name1)
            
          }
          
        }else{
          familyTree[name2]["wives"] = [name1]
        }
        familyTree[name1]["husband"] = name2
      }else if(relationName === "husband"){
        familyTree[name2]["husband"] = name1
        if(familyTree[name1]["wives"]){
          if(!familyTree[name1]["wives"].includes(name2)) familyTree[name1]["wives"].push(name2)
          
        }else{
          familyTree[name1]["wives"] = [name2]
        }
      }
    }else{
      console.log("First add the named persons and then conenct")
    }
  }

  
  
  

  
}

/**
 * 
 * @param {*} name 
 * 
 * we will have all the keys in familyTree then for every key
 * we will search in its "sons" or "daughters" array for the name we 
 * recieve in function input 
 * 
 * 
 * 
 *          
 */

const searchFather = (name)=>{
  let flag = true
  for(const key in familyTree){
    const person = familyTree[key]
    if(person["sons"] && person["sons"].includes(name)){
      flag = false
      console.log(`${name}'s father = ${key}`)
    } 

    if(person["daughters"] && person["daughters"].includes(name)){
      flag = false
      console.log(`${name}'s father = ${key}`)
    }

    
  }
  if(flag){
    console.log(`No entry of father`)
  }
}

/**
 * 
 * @param {*} argsArr 
 * 
 * 
 */

const getFather = (argsArr)=>{
  const indOf = argsArr.indexOf("of")
  const name = argsArr.slice(indOf+1).join(" ")
  //first check if name exixts in family tree keys
  if(Object.keys(familyTree).includes(name)){
    const person = familyTree[name]
    if(person["father"]) console.log(`${name}'s father = ${person["father"]}`)
    else searchFather(name)
  }else{
    searchFather(name)
  }
}

/**
 * 
 * @param {} name 
 * we will search in wives array then return the specific key value
 */

const searchHusband = (name)=>{
  let flag = true
  for(const key in familyTree){
    const person = familyTree[key]
    if(person["wives"] && person["wives"].includes(name)){
      console.log(`${name}'s husband = ${key}`)
      flag = false
    }
  }
  if(flag) console.log(`No husband for ${name}`)
}


/**
 * 
 * @param {*} argsArr 
 * if the provided name is in any person's wives array 
 */

const getHusband = (argsArr)=>{
  const indOf = argsArr.indexOf("of")
  const name = argsArr.slice(indOf+1).join(" ")
  if(Object.keys(familyTree).includes(name)){
    const person = familyTree[name]
    if(person["husband"]) console.log(`${name}'s husband = ${person["husband"]}`)
    else searchHusband(name)
  }else{
    searchHusband(name)
  }
}

/**
 * 
 * @param {*} argsArr 
 * simple return the length of array
 */
const countResult = (argsArr)=>{
  const keyword = argsArr[1]
  const indOf = argsArr.indexOf("of")
  const name = argsArr.slice(indOf+1).join(" ")
  if(familyTree[name]){
    if(familyTree[name][keyword]){
      console.log(`Total ${keyword} ${familyTree[name][keyword].length}`)  
    }else{
      console.log(`Total ${keyword} 0`)
    }
  }else{
    console.log(`Total ${keyword} 0`)
  }
  
}

/**
 * for initializing the family tree
 */





console.log(`
  SAMPLE INPUTS



add person vaibhav

add person vaishali

add person nakul

add person anamika

add person lata

add person sushil sharma

add relationship husband

add relationship father

add relationship son

add relationship daughter

add relationship wife

connect anamika as daughter of sushul sharma

connect anamika as daughter of sushil sharma

connect vaishali as daughter of sushil sharma

connect vaibhav as son of sushil sharma

connect nakul as son of sushil sharma

connect lata as wife of sushil sharma

connect suhsil sharma as husband of lata

connect sushil sharma as husband of lata

print

count daughters of sushil sharma
Total daughters 2

count sons of sushil sharma
Total sons 2

count wives of sushil sharma
Total wives 1

father of nakul
nakul's father = sushil sharma

father of vaibhav
vaibhav's father = sushil sharma

father of anamika
anamika's father = sushil sharma

husband of lata
lata's husband = sushil sharma

`)

console.log(`
  FOR ADDING A PERSON:          add person <name>
  FOR ADDING RELATIONSHIP:      add relationship <name>
  FOR CONNECTION:               connect <name1> as <relationship name> of <name2>
  FOR COUNT QUERY:              count sons of <name>
                                count wives of <name>
                                count daughters of <name>
  FOR FATHER QUERY:             father of <name>
  FOR HUSBAND QUERY:            husband of <name>
  `)


function generateFamilyTree() {
  
  readLineInterface.question('Enter command ', (input) => {
    // Parse the user input
    const argsArr = input.trim().split(' ');

    const commandType = argsArr[0]
    if(validKeys.includes(commandType)){
      switch(commandType){
        case "add":
          addNewPerson(argsArr)
          break
        case "connect":
          if(argsArr.includes("as") && argsArr.includes("of")){
            connectPersons(argsArr)
            break
          }else{
            console.log("Invalid connect command")
            break
          }
        case "count":
          countResult(argsArr)
          break
        case "father":
          getFather(argsArr)
          break
        case "husband":
          getHusband(argsArr)
          break
        case "exit":
          readLineInterface.close()
          return
        case "print":
          console.log(familyTree)
          break
        default:
          console.log("Invalid command in switch")
      }
    }else{
      console.log("Invalid Command over all if")
    }

    
    generateFamilyTree();
  });
}

generateFamilyTree();
