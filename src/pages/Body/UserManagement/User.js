import { DataGrid } from '@mui/x-data-grid';
import {Avatar} from "@mui/material";
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const columns = [
  { field: 'id', headerName: 'No', type: 'number', width: 60 },
  { field: 'profileImage', headerName: '프로필', width: 90, align: 'center',
    renderCell: (params) => {
      return (
        <>
          <Avatar src={params.value.avatar} />
          {/*{params.value.username}*/}
        </>
      );
    }},
  { field: 'userId', headerName: '사용자 아이디', width: 200 },
  { field: 'userType', headerName: '사용자 타입', width: 90 },
  { field: 'nickname', headerName: '닉네임', width: 90 },
  { field: 'email', headerName: '이메일', width: 200 },
  { field: 'company', headerName: '소속', width: 90 },
  { field: 'peach', headerName: '피치',  type: 'number',  width: 90 },
  { field: 'joinTime', headerName: '가입일', width: 200 },
  { field: 'editTime', headerName: '수정일', width: 200 },
];

const rows = [
  { id: 1, profileImage: { avatar: "http://k.kakaocdn.net/dn/byG4fT/btrPujvaV0z/LY2pLuy0oHDI2Tpa1w2WO0/img_640x640.jpg"},
    userId: 'jinu', userType: 'admin', nickname: '릴팝', email: 'jinu@lilpop.kr', company: 'LILPOP', peach: 100,
  joinTime: '2022-12-01 12:30:00', editTime: '2023-01-01 15:00:30'},
  { id: 2, profileImage: '', userId: 'kakao:123456789', userType: 'user', nickname: 'LILPOP', email: 'jinu@lilpop.kr', company: '', peach: 0,
    joinTime: '2022-12-01 12:30:00', editTime: '2023-01-01 15:00:30'},
];

const User = () => {

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: 'primary.light',
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },
        }}
      />
    </div>
  )
}

export default User;