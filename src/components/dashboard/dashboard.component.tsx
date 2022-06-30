import React from "react";
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableContainer,
  TableToolbar,
  TableToolbarSearch,
  TableToolbarAction,
  TableToolbarMenu,
  TableToolbarContent,
  Button,
  Tag,
} from "carbon-components-react";
import { Download, Edit, DocumentImport } from "@carbon/icons-react/next";
import styles from "./dashboard.css";
import { usePOCForms } from "../../api/usePOCForms";
import { useTranslation } from "react-i18next";

function getTableRows(t, data) {
  const tableRows = [];
  data?.map((row, key) =>
    tableRows.push({
      id: key,
      name: row.name,
      version: row.version,
      published: row.published ? (
        <Tag type="green" size="sm" title="Clear Filter">
          {t("yes", "Yes")}
        </Tag>
      ) : (
        <Tag type="red" size="sm" title="Clear Filter">
          {t("no", "No")}
        </Tag>
      ),
      retired: row.retried ? (
        <Tag type="red" size="sm" title="Clear Filter">
          {t("yes", "No")}
        </Tag>
      ) : (
        <Tag type="green" size="sm" title="Clear Filter">
          {t("no", "No")}
        </Tag>
      ),
      actions:
        row.resources.length == 0 || !row.resources[0] ? (
          <Button
            className={styles.importButton}
            renderIcon={DocumentImport}
            kind={"ghost"}
            iconDescription={t("import", "Import")}
            hasIconOnly
          />
        ) : (
          <>
            <Button
              className={styles.editButton}
              renderIcon={Edit}
              kind={"ghost"}
              iconDescription={t("editForm", "Edit Form")}
              hasIconOnly
            />
            <Button
              className={styles.downloadButton}
              renderIcon={Download}
              kind={"ghost"}
              iconDescription={t("download", "Download")}
              hasIconOnly
            />
          </>
        ),
    })
  );
  return tableRows;
}

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { data } = usePOCForms();
  const rows = getTableRows(t, data);
  const headers = [
    {
      header: t("name", "Name"),
      key: "name",
    },
    {
      header: t("version", "Version"),
      key: "version",
    },
    {
      header: t("published", "Published"),
      key: "published",
    },
    {
      header: t("retired", "Retired"),
      key: "retired",
    },
    {
      header: t("actions", "Actions"),
      key: "actions",
    },
  ];

  return (
    <div>
      <DataTable rows={rows} headers={headers}>
        {({
          rows,
          headers,
          getTableProps,
          getHeaderProps,
          getRowProps,
          getToolbarProps,
          onInputChange,
          getTableContainerProps,
        }) => (
          <TableContainer
            title={t("formBuilder", "Form builder")}
            {...getTableContainerProps()}
          >
            <div className={styles.toolbar}>
              <TableToolbar
                {...getToolbarProps()}
                aria-label="data table toolbar"
              >
                <TableToolbarContent>
                  <TableToolbarSearch onChange={onInputChange} />
                  <TableToolbarMenu>
                    <TableToolbarAction>POC</TableToolbarAction>
                  </TableToolbarMenu>
                  <Button>Create New</Button>
                </TableToolbarContent>
              </TableToolbar>
            </div>
            <Table {...getTableProps()}>
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableHeader {...getHeaderProps({ header })}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow {...getRowProps({ row })}>
                    {row.cells.map((cell) => (
                      <TableCell key={cell.id}>{cell.value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DataTable>
    </div>
  );
};

export default Dashboard;
