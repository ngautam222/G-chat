import { Circle } from 'better-react-spinkit'
function Loading() {
    return (
        <center>
            <div>
                <img src='http://cdn.onlinewebfonts.com/svg/img_397748.png'
                    height={200}
                    style={{ marginButton: 10 }}
                />
                <Circle color='#3CBC28' size={60} />
            </div>
        </center>
    );
}

export default Loading