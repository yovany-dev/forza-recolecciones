export async function deleteDriverAPI(uuid: string | undefined) {
  const res = await fetch(`/api/driver/${uuid}`, { method: 'DELETE' });
  const deleteDriver = await res.json();

  return deleteDriver;
}
