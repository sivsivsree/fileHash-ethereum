
# fileHash-ethereum



To compile the contract 
-  `node` [compile.js](https://github.com/sidharth28/fileHash-ethereum/blob/master/compile.js "compile.js")

To deploy 
 - `node` [deploy.js](https://github.com/sidharth28/fileHash-ethereum/blob/master/deploy.js "deploy.js")

Run the server using

-  `node index.js`
- you can specify the port in `env.NODE_ENV`


### API ENDPOINTS

**/access**

    POST /access 200 OK
    
    REQUEST BODY
    -----------------
    _filename  string
    _fileID    string
	_createdBy string
	_email .   string
	_accessStr string [GIVE/REVOKE]
	_ass	   string [READ/EDIT/COPY/SCREENSHOT/WATERMARK/SAVEAS]

**/getAccess**

    POST /getAccess 200 OK
    
    REQUEST BODY
    -----------------
    _filename  string
    _fileID    string
	_createdBy string
	_email .   string

**/createFile**

    POST /createFile 200 OK
    
    REQUEST BODY
    -----------------
    _filename  string
    _fileID    string
	_createdBy string
	_email .   string
	
**/updateFile**


    POST /updateFile 200 OK
    
    REQUEST BODY
    -----------------
    _filename  string
    _fileID    string
	_createdBy string    
	_updatedAt string
	_updatedBy string
	_docAction map
	
**/updateInfo**

    POST /updateInfo 200 OK
    
    REQUEST BODY
    -----------------
    _filename  string
    _fileID    string
	_createdBy string
