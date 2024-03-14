function UserProfilePage(props){
    return (
        <h1>{props.username}</h1>
    )
}

export default UserProfilePage;
// only executes on the server after deployment
export async function getServerSideProps(context){

    const { params, req, res } = context;

    return {
        props: {
            username: 'Max'
        }
    };
}