class mouseEffect{
    X = 0
    Y = 0
    onMove = false
    onCreate4Item = false
    setTimeOnMove = undefined

    constructor(){
        this.setup()
        this.runEffect()
    }

    setup = function(){
        // config
        this.colors = ['red', 'green', 'blue', 'violet', 'orange']
        this.colorLength = this.colors.length
        this.maxSize = 25
        this.minSize = 15
        this.minScope = 50
        this.maxScope = 80

        this.mouseEffectItem = document.createElement('div')
        document.body.appendChild(this.mouseEffectItem)
    }

    createItem = function(round, scope){
        const ITEM_WRAPPER = document.createElement('div')
        ITEM_WRAPPER.classList.add('item-wrapper')
        const ITEM = document.createElement('div')
        ITEM.classList.add('item-effect')

        const size = Math.floor(Math.random() * (this.maxSize+1 - this.minSize) + this.minSize) / 100
        const colorIndex = Math.floor(Math.random() * this.colorLength)
        const X = this.X
        const Y = this.Y

        ITEM.style.color = this.colors[colorIndex]

        Object.assign(ITEM_WRAPPER.style, {
            left: X + 'px',
            top: Y + 'px',
            opacity: 1,
            transform: `scale(${size}) rotate(0deg)`
        })

        ITEM_WRAPPER.appendChild(ITEM)
        this.mouseEffectItem.appendChild(ITEM_WRAPPER)

        let x, y;

        switch(round){
            case 1:
                x = y = -scope
                break
            case 2:
                x = y = scope
                break
            case 3:
                x = -scope
                y = scope
                break
            case 4:
                x = scope
                y = -scope
                break
            default: break
        }

        setTimeout(()=>{
            Object.assign(ITEM_WRAPPER.style, {
                left: X+x + 'px',
                top: Y+y + 'px',
                opacity: 0,
                transform: `scale(${size}) rotate(360deg)`
            })
        },25)

        setTimeout(()=>{
            this.mouseEffectItem.removeChild(ITEM_WRAPPER)
        },1025)
    }

    create4Item = function(){
        this.onCreate4Item = true

        let round = 1
        const setTime = setInterval(()=>{
            const scope = Math.floor(Math.random() * (this.maxScope+1 - this.minScope) + this.minScope)
            this.createItem(round, scope)
            round++
            (round > 4) && (clearInterval(setTime) || (this.onCreate4Item = false))
        },100)

    }

    runEffect = function(){
        window.onmousemove = e => {
            this.X = e.x
            this.Y = e.y

            this.onCreate4Item || this.create4Item()
        }
    }
}

new mouseEffect()