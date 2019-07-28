var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var trash = document.getElementsByClassName("fa-trash");



Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(){ //appends an event listener to each
        // const name = this.parentNode.parentNode.childNodes[1].innerText //this is thumb up
        const msg = this.parentNode.parentNode.childNodes[1].innerText
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[3].innerText)
        //parseFloat because DOM returns a number(parsfloat covers more bases despite being a decimal value as opposed to parseInt)
        fetch('messages', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'msg': msg,
            'thumbUp': thumbUp
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        // const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[1].innerText
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ //turns data into a sJSON object to be sent back and fort
            'msg': msg
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
