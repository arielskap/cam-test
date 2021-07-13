const Button = (props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
	return (
		<button className="px-2 py-1 text-white bg-blue-500 rounded" {...props} />
	)
}

export default Button
