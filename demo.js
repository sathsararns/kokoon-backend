const isShopOpen = true;

const mypromise = new Promise(
    (resolve, reject)=>{
        if(isShopOpen){
            console.log("Open");
            resolve();
        }else{
            console.log("Close");
            reject();
        }
    }
)

mypromise.then(
    ()=>{
        console.log("We are open");
    }
).catch(
    ()=>{
        console.log("We are closed");
    }
)