import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}

function Example() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('https://datausa.io/api/data?drilldowns=Nation&measures=Population').then((res) =>
        res.json(),
      ),
  })

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  const user_data = data.data;
  console.log(user_data)
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Nation</TableHead>
          <TableHead>Year</TableHead>
          <TableHead>Population</TableHead>
          <TableHead>Slug Nation</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {user_data.map((data, key) => (
          <TableRow key={key}>
            <TableCell className="font-medium">{data.Nation}</TableCell>
            <TableCell>{data.Year}</TableCell>
            <TableCell>{data.Population}</TableCell>
            <TableCell>{data['Slug Nation']}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}