import { useRef, useState } from "react"
import Webcam from "react-webcam"
import Button from "./Button"

const videoConstraints = {
	width: { min: 480 },
	height: { min: 720 },
	aspectRatio: 0.6666666667
}

const WebcamComponent = () => {
	const webcamRef = useRef<Webcam>(null)
	const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>()
	const [capturing, setCapturing] = useState(false)
	const [recordedChunks, setRecordedChunks] = useState<BlobEvent[`data`][]>([])

	const handleDataAvailable = ({ data }: { data: BlobEvent[`data`] }) => {
		if (data.size > 0) {
			setRecordedChunks((prev) => prev.concat(data))
		}
	}

	const handleStartCaptureClick = () => {
		const webcam = webcamRef.current
		if (webcam && webcam.stream) {
			setCapturing(true)
			const localMediaRecorder = new MediaRecorder(webcam.stream, {
				mimeType: `video/webm`
			})
			localMediaRecorder.addEventListener(
				`dataavailable`,
				handleDataAvailable
			)
			localMediaRecorder.start()
			setMediaRecorder(localMediaRecorder)
		}
	}

	const handleStopCaptureClick = () => {
		if (mediaRecorder) {
			mediaRecorder.stop()
			setCapturing(false)
		}
	}

	const handleDownload = () => {
		if (recordedChunks.length) {
			const blob = new Blob(recordedChunks, {
				type: `video/webm`
			})
			const url = URL.createObjectURL(blob)
			const a = document.createElement(`a`)
			document.body.appendChild(a)
			a.style.display = `none`
			a.href = url
			a.download = `react-webcam-stream-capture.webm`
			a.click()
			window.URL.revokeObjectURL(url)
			setRecordedChunks([])
		}
	}

	return (
		<div className="container flex flex-col items-center px-2 mx-auto space-y-4">
			<Webcam
				ref={webcamRef}
				videoConstraints={videoConstraints}
				width={480}
				height={720}
				className="border border-blue-500 rounded"
			/>
			{capturing
				? (
					<Button onClick={handleStopCaptureClick}>Stop Capture</Button>
				)
				: (
					<Button onClick={handleStartCaptureClick}>Start Capture</Button>
				)}
			{recordedChunks.length > 0 && (
				<Button onClick={handleDownload}>Download</Button>
			)}
		</div>
	)
}

export default WebcamComponent
