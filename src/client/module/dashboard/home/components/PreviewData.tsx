import { PenanggungJawab } from '../types/type';

export default function PreviewData({
  data,
  korwil,
}: {
  data: PenanggungJawab[];
  korwil: string;
}) {
  return (
    <div className="overflow-x-auto border-x">
      <table className="min-w-full table-fixed border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th
              colSpan={4}
              className="px-3 py-3 text-2xl text-left font-bold text-gray-700 border-b"
            >
              Korwil: {korwil}
            </th>
          </tr>
          <tr className=" text-gray-600 uppercase tracking-wider">
            <th className="w-1/4 px-3 py-2 border-b text-left">Nama Penanggung Jawab</th>
            <th className="w-1/4 px-3 py-2 border-b text-left">Lembaga</th>
            <th className="w-1/4 px-3 py-2 border-b text-left">Alamat</th>
            <th className="w-1/4 px-3 py-2 border-b text-left">Guru Tugas</th>
          </tr>
        </thead>
        <tbody>
          {data.map((pj) => (
            <tr key={`${pj.nama_pjgt}-${pj.lembaga}`} className="even:bg-gray-50 text-sm hover:bg-gray-100 transition-colors">
              <td className="px-3 py-2 border-b align-top">{pj.nama_pjgt || '-'}</td>
              <td className="px-3 py-2 border-b align-top">{pj.lembaga}</td>
              <td className="px-3 py-2 border-b align-top">{pj.alamat}</td>
              <td className="px-3 py-2 border-b align-top">
                {pj.guru_tugas && pj.guru_tugas.length > 0 ? (
                  <ul className="list-disc ml-5 space-y-1">
                    {pj.guru_tugas.map((gt) => (
                      <li key={`${pj.nama_pjgt}-${pj.lembaga}-${gt.nama_gt}`}>{gt.nama_gt}</li>
                    ))}
                  </ul>
                ) : (
                  '-'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
