import Webcam from '@components/Webcam'
import Layout from '@components/Layout'

const Index = () => {
	return (
		<Layout>
			<div className='flex items-center justify-center w-screen h-screen'>
				<Webcam />
			</div>
		</Layout>
	)
}

export default Index
