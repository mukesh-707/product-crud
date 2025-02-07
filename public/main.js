


function deleteProduct(id){
  const result =   confirm(
    "Are you Sure You Want To Delete this Product?")
    if(result){
        fetch('/delete-product/'+id, {
            method:'POST',
        }).then((res)=>{
            if(res.ok){
                location.reload()
            }
        })

    }

}