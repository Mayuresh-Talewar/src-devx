def create_initial_commit(repo_url, access_token):
    # Create a README.md or similar initial file
    initial_file_content = "Initial commit"
    headers = {'Authorization': f'token {access_token}'}
    
    # Create a blob for the initial file
    blob_response = requests.post(
        f'{repo_url}/git/blobs',
        headers=headers,
        json={
            "content": initial_file_content,
            "encoding": "utf-8"
        }
    )
    
    blob_sha = blob_response.json()['sha']
    
    # Create a tree including the initial blob
    tree_response = requests.post(
        f'{repo_url}/git/trees',
        headers=headers,
        json={
            "tree": [{
                "path": "README.md",
                "mode": "100644",
                "type": "blob",
                "sha": blob_sha
            }]
        }
    )
    
    tree_sha = tree_response.json()['sha']
    
    # Create the initial commit
    commit_response = requests.post(
        f'{repo_url}/git/commits',
        headers=headers,
        json={
            "message": "Initial commit",
            "tree": tree_sha,
        }
    )
    
    commit_sha = commit_response.json()['sha']
    
    # Update the reference of heads/master to point to the new commit
    requests.patch(
        f'{repo_url}/git/refs/heads/master',
        headers=headers,
        json={"sha": commit_sha}
    )

# Call this function right after the repository is created
create_initial_commit("https://api.github.com/repos/Mayuresh-Talewar/src", "<GITHUB_ACCESS_TOKEN>")