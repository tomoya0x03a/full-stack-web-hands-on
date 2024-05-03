'use client';

import { useState, useEffect } from 'react';
import axios from '../../../plugins/axios';
import {
    Alert,
    AlertColor,
    Box,
    Button,
    Paper,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { MuiFileInput } from 'mui-file-input'

export default function Page() {
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false)
    const [severity, setSeverity] = useState<AlertColor>('success');
    const [message, setMessage] = useState('');
    const result = (severity: AlertColor, message: string) => {
        setOpen(true);
        setSeverity(severity);
        setMessage(message);
    };

    const [fileSync, setFileSync] = useState()
    const onChangeFileSync = (newFile: any) => {
        setFileSync(newFile)
    }

    const doAddSync = ((e: any) => {
        if (!fileSync) {
            result('error', 'ファイルを選択してください')
            return
        }
        const params = {
            file: fileSync
        }
        axios.post('/api/inventory/sync', params, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(function (response) {
            console.log(response)
            result('success', '同期ファイルが登録されました')
        })
        .catch(function (error) {
            console.log(error)
        })
    })

    const [fileAsync, setFileAsync] = useState()
    
    const onChangeFileAsync = (newFile: any) => {
        setFileAsync(newFile)
    }

    const doAddAsync = ((e: any) => {
        if (!fileAsync) {
            result('error', 'ファイルを選択してください')
            return
        }

        const params = {
            file: fileAsync
        }
        axios.post('/api/inventory/async', params, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(function (response) {
            console.log(response)
            result('success', '非同期ファイルが登録されました')
        })
        .catch(function (error) {
            console.log(error)
        })
    })

    const handleClose = (event: any, reason: any) => {
        setOpen(false);
    };

    useEffect(() => {
        axios.get('/api/inventory/summary')
        .then((res) => res.data)
        .then((data) => {
            setData(data)
        })
    }, [open])

    return (
        <Box>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert severity={severity}>{message}</Alert>
            </Snackbar>
            <Typography variant="h5">売上一括登録</Typography>
            <Box m={2}>
                <Typography variant="subtitle1">同期でファイル取込</Typography>
                <MuiFileInput value={fileSync} onChange={onChangeFileSync} />
                <Button variant="contained" onClick={doAddSync}>登録</Button>
            </Box>
            <Box m={2}>
                <Typography variant="subtitle1">非同期でファイル取込</Typography>
                <MuiFileInput value={fileAsync} onChange={onChangeFileAsync} />
                <Button variant="contained" onClick={doAddAsync}>登録</Button>
            </Box>
            <Box m={2}>
                <Typography variant="subtitle1">年月ごとの売上数集計</Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>処理月</TableCell>
                                <TableCell>合計数量</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((data: any) => (
                                <TableRow key={data.monthly_data}>
                                    <TableCell>{data.monthly_date}</TableCell>
                                    <TableCell>{data.monthly_price}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}
