import Papa from "papaparse";

export async function getUsers() {
    try {
        const response = await fetch("../datas/users.csv");

        console.log(response.status);
        console.log(response.url);

        const csvText = await response.text();

        console.log(csvText);

        const parsed = Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true
        });

        return parsed.data;

    } catch (error) {
        console.error("Error reading users.csv:", error);
        return [];
    }
}