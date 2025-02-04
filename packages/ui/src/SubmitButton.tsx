
type SubmitButtonProps = {
    callback: () => void
}

function SubmitButton({ callback }: SubmitButtonProps) {
    return (
        <button color='red' style={{margin:4 } } onClick={callback}>Submit</button>
    )
}

export default SubmitButton