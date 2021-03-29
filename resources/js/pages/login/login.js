import React, {useState} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Toast, ToastBody, ToastHeader } from 'reactstrap';
import { BsFillEyeFill, BsFillEyeSlashFill, BsArrowLeftShort } from "react-icons/bs";
import { useHistory } from 'react-router';
import { HTTPLoginUser } from "../../utils/http";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Slide, toast } from 'react-toastify';

function Login() {
	toast.configure()
	const history = useHistory()
	
	const [loadingAction, setloadingAction] = useState(false)
  const [showPassword, setshowPassword] = useState(false)

	const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => {
      // console.log(JSON.stringify(values, null, 2));
      httpLoginUser(values)
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("format email tidak sesuai")
        .required("email wajib diisi"),
      password: Yup.string()
        .required("password wajib diisi"),
    })
  });

	const httpLoginUser = async (req) => {
		try {
			setloadingAction(true)
			const responseLoginUser = await HTTPLoginUser({
        email: req.email,
        password: req.password,
      })

			setloadingAction(false)
			// console.log(responseLoginUser)
			toast(responseLoginUser.data.message, {
				position: "bottom-right",
				autoClose: 5000,
				type: 'success',
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				transition: Slide
			})
		} catch (error) {
			// console.log(error.data)
			setloadingAction(false)
			toast(error.data.error.message, {
				position: "bottom-right",
				autoClose: 5000,
				type: 'error',
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				transition: Slide
			})
		}
	}

	return(
		<div style={{height: '100vh'}} className="d-flex flex-column justify-content-center align-items-center">
			<form 
				className={` 
				bg-primary text-light px-4 py-4 rounded-lg shadow-lg`
				} 
				onSubmit={formik.handleSubmit} noValidate autoComplete="on"
			>
				<h2 className="text-center mb-4">Form Login</h2>
				<FormGroup className="w-100">
					<Label for="exampleEmail">Email</Label>
					<input 
						type="email" className={`${formik.errors.email ? 'is-invalid': ''} form-control`} name="email" id="email" placeholder="masukan email" 
						onChange={formik.handleChange}
						value={formik.values.email}
					/>
					<span className="invalid-feedback pl-2 rounded" style={{backgroundColor:'#e3342f', color: '#fff'}}>
						{ formik.errors.email ? formik.errors.email : ''}
					</span>
				</FormGroup>
				<FormGroup className="w-100">
					<Label for="examplePassword">Password</Label>
					<div className={`input-group ${formik.errors.password ? 'is-invalid': ''}`}>
						<input 
							type={`${showPassword === false ? 'password' : 'text'}`} 
							className={`${formik.errors.password ? 'is-invalid': ''} form-control`} 
							name="password" id="password" placeholder="masukan password" 
							onChange={formik.handleChange}
							value={formik.values.password}
						/>
						<div className="input-group-prepend">
							<Button 
								type="button" color="light" onClick={() =>{setshowPassword(!showPassword)}}
								style={{borderTopRightRadius: 5, borderBottomRightRadius: 5}}
							>
								{
									showPassword === false ? <BsFillEyeFill color="grey" size={15}/>
									: <BsFillEyeSlashFill color="grey" size={15}/>
								}
							</Button>
						</div>
					</div>
					<span className="invalid-feedback pl-2 rounded" style={{backgroundColor:'#e3342f', color: '#fff'}}>
						{ formik.errors.password ? formik.errors.password : ''}
					</span>
				</FormGroup>
				
				<div className="w-100">
					<button className="w-50 rounded-0 btn btn-success"
						onClick={()=>{
							history.push('/')
						}}
					>
						{/* <BsArrowLeftShort size={25}/>  */}
						kembali
					</button>

					<button type="submit" className="w-50 rounded-0 btn btn-danger" disabled={loadingAction === false ? false : true}>
						{
							loadingAction === false ? 'Kirim' : 
							<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
						}
					</button>
				</div>
			</form>
		</div>
	)
}

export default Login;