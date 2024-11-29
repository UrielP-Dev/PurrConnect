import React from 'react';
import { ScrollView } from 'react-native';
import Post from './Post';

const PostsList = ({ posts, onLike }) => (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
        {posts.map(post => (
            <Post key={post.id} post={post} onLike={onLike} />
        ))}
    </ScrollView>
);

export default PostsList;
