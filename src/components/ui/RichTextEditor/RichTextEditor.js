import {useState} from "react";

export default function RichTextEditor({initialValue}) {

    const [content,setContent] = useState(initialValue ? initialValue :'');

    const changeContent = (e) => {
        setContent(e.currentTarget.innerHTML);
    }

    const modifyText = (command) => {
        if (command === 'createLink'){
            let userLink = prompt("Enter a URL");
            if (userLink && /http/i.test(userLink)) {
                document.execCommand(command, false, userLink);

            } else if (userLink) {
                userLink = "http://" + userLink;
                document.execCommand(command, false, userLink);
            }
        }else{
            document.execCommand(command, false, value);
        }
    }
    return (
        <>
            <div className="p-5">
                <button onClick={() => modifyText('bold')} className="dark:bg-gray-800">B</button>
            </div>

            <div className="p-5 border rounded bg-gray-800 w-full"
                 contentEditable={true}
                 onKeyDown={changeContent}
                 dangerouslySetInnerHTML={{ __html: content }}> </div>
        </>
    )
}