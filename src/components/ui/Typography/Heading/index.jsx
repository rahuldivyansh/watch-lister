const Heading = ({ children, ...props }) => {
    return <h2 {...props} className="text-2xl font-extrabold dark:text-white m-3">{children}</h2>;
}
export default Heading;