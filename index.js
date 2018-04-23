(function(){

    // utility functions
    const extend = (source, newProps) => Object.assign({}, source, newProps)
    
    const createNode = (element, className, content) => {
        let el = document.createElement(element)
        el.className = className
        typeof content === 'string' ? el.innerText = content : el.innerHTML = content
        return el;
    }

    // modal constuctor
    this.Modal = function() {
        
        this.closeButton = null
        this.overlay = null
        this.modal = null
        
        let defaults = {
            className: "",
            closeButton: true,
            content: "",
            maxWidth: 800,
            minWidth: 200,
            overlay: true
        }
        
        if (arguments[0] && typeof arguments[0] === 'object'){
            this.options = extend(defaults, arguments[0])
        } else {
            this.options = defaults
        }
    
    }
    // prive functions

    function buildModal(){
        let content, doc, holder;

        if (typeof this.options.content === 'string'){
            content = this.options.content 
        } else {
            content = this.options.content.innerHTML
        }

        //create doc fragment Since the document fragment is in memory and not part of the main DOM tree,
        //appending children to it does not cause page reflow (computation of element's
        //position and geometry). Consequently, using document fragments often results in better performance.

        doc = document.createDocumentFragment();

        this.modal = createNode('div', this.options.className, this.options.content)
        this.modal.style.maxWidth = this.options.maxWidth + "px"
        this.modal.style.maxWidth = this.options.minWidth + "px"

        if (this.options.closeButton) {
            this.closeButton = createNode('button', 'close-button sco-close', 'x')
            this.modal.appendChild(this.closeButton)
        }

        if (this.options.overlay === true) {
            this.overlay = createNode('div', 'sco-overlay' + this.options.className, "")
            doc.appendChild(this.overlay)
        }

        holder = createNode('div', 'sco-content', '');
        this.modal.appendChild(holder)
        doc.appendChild(this.modal);
        console.log(doc)
        document.body.appendChild(doc);
    }

    function initializeEvents() {
        
        if(this.closeButton) {
            this.closeButton.addEventListener('click', this.close.bind(this))
        }

        if (this.overlay) {
            this.closeButton.addEventListener('click', this.close.bind(this))            
        }

    }

    // public methods 

    Modal.prototype.open = function(){

        buildModal.call(this)
        
        initializeEvents.call(this)

        window.getComputedStyle(this.modal).height

        this.modal.className = this.modal.className +
         (this.modal.offsetHeight > window.innerHeight ?
        " scotch-open scotch-anchored" : " scotch-open");
            this.overlay.className = this.overlay.className + " scotch-open";
    
    }

    Modal.prototype.close = function(){

        let _self = this

        this.modal.className = this.modal.className.replace(" ")

        this.modal.addEventListener(this.transitionEnd, function() {
            _self.modal.parentNode.removeChild(_self.modal)
        })

        this.overlay.addEventListener(this.transitionEnd, function() {
            if(_self.overlay.parentNode) _self.overlay.parentNode.removeChild(_sef.overlay)
        })

    }

}())


var myContent = document.getElementById('content');

var myModal = new Modal({
  content: myContent,
  className: 'zoom'
});

var triggerButton = document.getElementById('trigger');

triggerButton.addEventListener('click', function() {
  myModal.open();
});