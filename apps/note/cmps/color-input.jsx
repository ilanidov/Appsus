
export function ColorInput({onSetNoteStyle }) {
    const colors = ['rgb(215, 249, 213)' , '#c2f9b3', '#F9FFA4', '#FFD59E', '#f6c5c5' ,
     'rgb(238, 216, 219)' , 'rgb(233, 241, 248)' , 'rgb(214, 255, 252)' , ]

    function onChooseColor(color) {
        console.log(color)
        const newStyle= { backgroundColor: color }
        onSetNoteStyle(newStyle)
    }

    return <section className="color-input">
        <div className="colors-container">
            {
                colors.map(color => <div
                    className="color"
                    key={color}
                    style={{ backgroundColor: color }}
                    onClick={() => onChooseColor(color)}
                ></div>)
            }
        </div>
    </section>
}