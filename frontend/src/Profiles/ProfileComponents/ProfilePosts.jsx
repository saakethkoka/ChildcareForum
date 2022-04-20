import { Post } from './PostTemplate'
import { Grid, Button } from '@mui/material'
import  ProfileNavbar  from './UserNavBar'

const ProfilePosts = () => {


    const listItems = [
        {title:"Hello",
            id: 1,
            votes: 0,
            userVote: 0,
            time: "2019-01-03 12:34",
            restricted: false,
            username: "John Doe",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a mi quis diam scelerisque imperdiet. Nulla fermentum quis mi ut dapibus. Proin hendrerit sagittis magna, at ornare enim rhoncus vel. In vulputate enim nunc, vel laoreet quam dignissim malesuada. Sed sit amet odio eros. Vestibulum eleifend, nulla eget vehicula rutrum, nisi nibh lobortis justo, ac ultricies justo nulla id velit. Pellentesque massa leo, blandit rutrum sem et, congue mollis nibh. Praesent vitae auctor justo. Phasellus et nisi leo. Cras nec malesuada nisi. Sed vitae bibendum ligula, a gravida justo. Mauris scelerisque massa vel porttitor convallis. Aenean consequat pretium turpis sit amet ornare."},
        {title:"Hello Version 2",
            id: 2,
            votes: -3,
            restricted: true,
            userVote: -1,
            time: "2019-01-03 12:54",
            username: "Dohn Joe",
            content: "Curabitur non commodo dui, nec ullamcorper erat. Curabitur varius nulla lobortis ipsum lobortis, nec imperdiet dui dignissim. Pellentesque sed iaculis risus. Aenean suscipit in metus sit amet tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi maximus facilisis lorem eu venenatis. Nulla molestie risus ac vulputate condimentum. Curabitur at libero orci. In id neque velit. Nulla placerat eget ex non luctus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam diam risus, feugiat et feugiat ac, iaculis venenatis quam. Maecenas pellentesque nulla nec lacus varius, ac tempor nisl scelerisque."}
    ]

    return (
        
        <Grid container
                  sx={{
                      padding: '1rem',
                      backgroundColor: '#F3F6F9',
                      height: '100%',
                  }}
                  spacing={1}>
                {console.log(listItems)}
                <ProfileNavbar/>
                {listItems.map((post) =>
                    <Post post={post}/>
                )}
        </Grid>
    )
}

export default ProfilePosts