import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Typography } from '@mui/material';
import { Colors } from '../styles/theme';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useFormik } from 'formik'; 





const validationSchema = Yup.object().shape({
  title: Yup.string().required('Please Enter a Title'),
  author: Yup.string().required(' Please Enter an Author Name'),
  category: Yup.string().required('Please Choose a Category'),
  body: Yup.string().required('Please Enter a Body'),

  




});

export default function ManageArticle() {
  
    const [open, setOpen] = useState(false)
    const [articleData, setArticleData] = useState([])
    const [refreshPage, setRefreshPage] = useState(false);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [deletingArticleId, setDeletingArticleId] = useState(null);
    const [updatingArticleId, setUpdatingArticleId] = useState(null);
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);


 
    

  const handleAddArticle = () => {
    setOpen(true);
  };
  
  const handleCloseForm = () => {
    setOpen(false);
  }

  


  //fetching data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:4000/api/articles/article');
        console.log(response.data);
        setArticleData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [refreshPage]);
    //fetching data


    //posting article
   
  
    const addArticle = async (values) => {
        try {
          console.log('Formik Values:', values); 
      
          const response = await axios.post('http://localhost:4000/api/articles/article',{
            title:values.title,
            author:values.author,
            category:values.category,
            body:values.body

            
          });
      
          console.log('Server Response:', response);
      
          if (response.status === 200) {
            setArticleData((prevData) => [...prevData, response.data]);
            handleCloseForm();
            setRefreshPage((prev) => !prev);
          } else {
            console.error(
              'Error adding article. Server responded with:',
              response.status,
              response.statusText,
              
            );
          }
        } catch (error) {
          console.error('Error adding article:', error.message);
        }
      };
    
  
        
  //posting article

  //Delete Function

  const handleOpenDeleteConfirmation = (articleId) => {
    setDeletingArticleId(articleId);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmed = () => {
    handleDeleteArticle(deletingArticleId);
    setDeleteConfirmationOpen(false);
  };
  
  
  const handleDeleteArticle = async (articleId) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/articles/article/${articleId}`);
  
      if (response.status === 200) {
        setArticleData((prevData) => prevData.filter((article) => article.id !== articleId));
        setRefreshPage((prev) => !prev);
      } else {
        console.error(
          'Error deleting article. Server responded with:',
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };
//Delete Function  

//Update Function
const handleOpenUpdateDialog = (ArticleId) => {
  setUpdatingArticleId(ArticleId);
  setUpdateDialogOpen(true);
};

const updateArticle = async (values) => {
  try {
    console.log('Formik Values:', values);

    const response = await axios.put(
      `http://localhost:4000/api/articles/article/${updatingArticleId}`,
      {
          title:values.title,
          author:values.author,
          type:values.type,
          body:values.body,
      }
    );

    console.log('Server Response:', response);

    if (response.status === 200) {
      setArticleData((prevData) =>
        prevData.map((article) =>
          article.id === updatingArticleId ? response.data : article
        )
      );
      setUpdateDialogOpen(false); // Close the dialog after successful update
      setRefreshPage((prev) => !prev);
    } else {
      console.error(
        'Error updating article. Server responded with:',
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error('Error updating artcle:', error);
  }
};

//Update Function


  return (
    <>
      <h1>Articles</h1>
      <Button 
        startIcon={<AddIcon />}
        variant="contained"
        onClick={handleAddArticle}
      >
        Add Article
      </Button>

      <TableContainer>
        <Table>
          <TableHead>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Body</TableCell>
            <TableCell>Update or Delete</TableCell>
            
          </TableHead>
          <TableBody>
      {articleData.map((article) => (
        article ? (
          console.log(article),
          <TableRow key={article.id}>
            <TableCell>{article.title}</TableCell>
            <TableCell>{article.author}</TableCell>
            <TableCell>{article.category}</TableCell>
            <TableCell>{article.body}</TableCell>
            <TableCell>
            <IconButton onClick={() => handleOpenUpdateDialog(article.id)}>
              <EditIcon sx={{ color: Colors.primary }} />
            </IconButton>
            <IconButton onClick={() => handleOpenDeleteConfirmation(article.id)}>
              <DeleteForeverIcon sx={{ color: Colors.danger }} />
            </IconButton>
            </TableCell>
          </TableRow>
        ) : null
      ))}
    </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} fullWidth maxWidth="lg">
        <DialogTitle>{"Add Article"}</DialogTitle>

        <Formik
  validationSchema={validationSchema}
  onSubmit={addArticle}
  initialValues={{
    title:'',
    author: '',
    category:'',
    body: '',

  }}
>
  {({ dirty, isValid, values, handleChange }) => (
    <Form>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="title"
              required
              fullWidth
              name="title"
              value={values.title}
              onChange={handleChange}
              />
            <ErrorMessage name="title">
              {(message) => (
                <Typography color={'red'}>{message}</Typography>
              )}
            </ErrorMessage>
          </Grid>
          <Grid item xs={12}>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="author"
              required
              fullWidth
              name="author"
              value={values.author}
              onChange={handleChange}
              />
            <ErrorMessage name="author">
              {(message) => (
                <Typography color={'red'}>{message}</Typography>
              )}
            </ErrorMessage>
          </Grid>
          <Grid item xs={12}>
            <Select
              name="category"
              required
              fullWidth
              label="category"
              value={values.category}
              onChange={handleChange}
              displayEmpty
            >
              <MenuItem value="" disabled>
               Choose The Category
              </MenuItem>
              <MenuItem value="article1">article 1</MenuItem>
            <MenuItem value="article2">article 2</MenuItem>
            <MenuItem value="article3">article 3</MenuItem>
            </Select>
            <ErrorMessage name="category">
              {(message) => (
                <Typography color={'red'}>{message}</Typography>
              )}
            </ErrorMessage>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="body"
              required
              fullWidth
              name="body"
              value={values.body}
              onChange={handleChange}
              />
            <ErrorMessage name="body">
              {(message) => (
                <Typography color={'red'}>{message}</Typography>
              )}
            </ErrorMessage>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button 
        type="submit" variant="contained" color="primary" disabled={!isValid || !dirty}>
        Add
      </Button>
        <Button autoFocus onClick={handleCloseForm}>
          Cancel
        </Button>
      </DialogActions>
    </Form>
  )}
</Formik>;
      </Dialog>
      <Dialog open={deleteConfirmationOpen} onClose={() => setDeleteConfirmationOpen(false)}>
  <DialogTitle> Delete Confirmation</DialogTitle>
  <DialogContent>
    <Typography>Are You Sure You Want to Delete This Article?</Typography>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setDeleteConfirmationOpen(false)} color="primary">
      Cancel
    </Button>
    <Button onClick={handleDeleteConfirmed} color="primary">
      Delete
    </Button>
  </DialogActions>
</Dialog> 
<Dialog open={updateDialogOpen} onClose={() => setUpdateDialogOpen(false)}>
  <DialogTitle> Update Article</DialogTitle>

  <Formik
  validationSchema={validationSchema}
  onSubmit={updateArticle}
  initialValues={{
    title:'',
    author: '',
    category:'',
    body: '',
  }}
>
  {({ dirty, isValid, values, handleChange }) => (
    <Form>
    <DialogContent>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="title"
            required
            fullWidth
            name="title"
            value={values.title}
            onChange={handleChange}
            />
          <ErrorMessage name="title">
            {(message) => (
              <Typography color={'red'}>{message}</Typography>
            )}
          </ErrorMessage>
        </Grid>
        <Grid item xs={12}>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="author"
            required
            fullWidth
            name="author"
            value={values.author}
            onChange={handleChange}
            />
          <ErrorMessage name="author">
            {(message) => (
              <Typography color={'red'}>{message}</Typography>
            )}
          </ErrorMessage>
        </Grid>
        <Grid item xs={12}>
          <Select
            name="category"
            required
            fullWidth
            label="category"
            value={values.category}
            onChange={handleChange}
            displayEmpty
          >
            <MenuItem value="" disabled>
             Choose The Category
            </MenuItem>
            <MenuItem value="article1">article 1</MenuItem>
            <MenuItem value="article2">article 2</MenuItem>
            <MenuItem value="article3">article 3</MenuItem>
          </Select>
          <ErrorMessage name="category">
            {(message) => (
              <Typography color={'red'}>{message}</Typography>
            )}
          </ErrorMessage>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="body"
            required
            fullWidth
            name="body"
            value={values.body}
            onChange={handleChange}
            />
          <ErrorMessage name="body">
            {(message) => (
              <Typography color={'red'}>{message}</Typography>
            )}
          </ErrorMessage>
        </Grid>
      </Grid>
    </DialogContent>

    <DialogActions>
      <Button type="submit" variant="contained" color="primary" disabled={!isValid || !dirty}>
      Update
    </Button>
      <Button autoFocus onClick={handleCloseForm}>
        Cancel
      </Button>
    </DialogActions>
  </Form>
  )}
</Formik>

</Dialog>

    </>
  );
}