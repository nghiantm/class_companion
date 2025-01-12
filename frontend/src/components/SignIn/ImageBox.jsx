import sign_in_img from '../../assets/sign_in_image.jpg';

export default function ImageBox() {
    return (
        <div className={"min-h-full"}>
            <div className={"min-h-full flex justify-center items-center"}>
                <img src={sign_in_img} alt={"art"} className={""}/>
            </div>
        </div>
    )
}