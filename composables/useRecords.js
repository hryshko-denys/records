const records = ref([]);
const recordsAlreadyLoaded = ref(false);

export default () => {
  const client = useSupabaseClient();
  const { user } = useUser();

  const getAllRecords = async () => {
    try {
      const recordFromService = await client
        .from("first")
        .select()
        .contains("people", [user.value?.email]);
      console.log(recordFromService);

      records.value = recordFromService.data || [];

      recordsAlreadyLoaded.value = true;
    } catch (error) {
      console.error(error)
    }
  };
  const addNewRecord = async (record, recordWith) => {
    console.log(record, "newRecord");
    const { data, error } = await client.from("first").upsert(record).select();

    if (data) {
      records.value.push(...data);
      navigateTo(`/dashboard/${recordWith}`);
    }

    if (error) {
      console.log("SHOW error");
    }

    console.log(data, error);
  };

  const uniqueUsers = computed(() => {
    const users = records.value.map(
        (deal) => deal.people.filter((person) => person !== user.value.email)[0]
    );

    return Array.from(new Set(users)) || [];
  })

  const deleteRecord = async (id) => {
    const { error } = await client.from('first').delete().eq('id', id)

    if (error) {
      console.log('delete record error', error)
    } else {
      records.value = records.value.filter(record => record.id !== id)
    }
  }

  const editRecord = async (id) => {

  }

  return { getAllRecords, records, addNewRecord, recordsAlreadyLoaded, uniqueUsers, deleteRecord };
};
